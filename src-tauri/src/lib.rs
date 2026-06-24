use std::path::PathBuf;
use std::time::{Duration, SystemTime, UNIX_EPOCH};

use tauri::webview::PageLoadEvent;
use tauri::{AppHandle, Manager, WebviewUrl, WebviewWindowBuilder};
use url::Url;

#[tauri::command]
fn write_export_file(path: String, contents: Vec<u8>) -> Result<(), String> {
  if path.is_empty() {
    return Err("empty path".into());
  }
  std::fs::write(&path, contents).map_err(|e| e.to_string())
}

#[tauri::command]
async fn print_html_document(app: AppHandle, html: String) -> Result<(), String> {
  let ts = SystemTime::now()
    .duration_since(UNIX_EPOCH)
    .map_err(|e| e.to_string())?
    .as_millis();
  let label = format!("print-{ts}");
  let temp_path: PathBuf = std::env::temp_dir().join(format!("mdtools-print-{ts}.html"));
  std::fs::write(&temp_path, &html).map_err(|e| e.to_string())?;

  let file_url =
    Url::from_file_path(&temp_path).map_err(|_| "invalid temp file path".to_string())?;

  let app_for_close = app.clone();
  let temp_path_cleanup = temp_path.clone();
  let window_label = label.clone();

  WebviewWindowBuilder::new(&app, &label, WebviewUrl::External(file_url))
    .visible(false)
    .decorations(false)
    .inner_size(800.0, 600.0)
    .on_page_load(move |window, payload| {
      if payload.event() != PageLoadEvent::Finished {
        return;
      }

      if let Err(e) = window.print() {
        log::error!("print_html_document: native print failed: {e}");
      }

      let app = app_for_close.clone();
      let cleanup_label = window_label.clone();
      let cleanup_path = temp_path_cleanup.clone();
      std::thread::spawn(move || {
        std::thread::sleep(Duration::from_secs(120));
        if let Some(w) = app.get_webview_window(&cleanup_label) {
          let _ = w.close();
        }
        let _ = std::fs::remove_file(&cleanup_path);
      });
    })
    .build()
    .map_err(|e| e.to_string())?;

  Ok(())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  use tauri::{Emitter, Manager};

  fn find_md_arg(args: &[String]) -> Option<String> {
    args
      .iter()
      .skip(1)
      .find(|a| a.ends_with(".md") || a.ends_with(".markdown"))
      .cloned()
  }

  fn emit_open_file(app: &tauri::AppHandle, md_path: &str) {
    if let Some(window) = app.get_webview_window("main") {
      let _ = window.show();
      let _ = window.set_focus();
      if let Ok(content) = std::fs::read_to_string(md_path) {
        let _ = window.emit(
          "open-file-content",
          serde_json::json!({ "path": md_path, "content": content }),
        );
      }
    }
  }

  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![write_export_file, print_html_document])
    .plugin(tauri_plugin_dialog::init())
    .plugin(tauri_plugin_fs::init())
    .plugin(tauri_plugin_single_instance::init(|app, argv, _cwd| {
      if let Some(md_path) = find_md_arg(&argv) {
        emit_open_file(app, &md_path);
      }
    }))
    .setup(|app| {
      if cfg!(debug_assertions) {
        app.handle().plugin(
          tauri_plugin_log::Builder::default()
            .level(log::LevelFilter::Info)
            .build(),
        )?;
      }

      let args: Vec<String> = std::env::args().collect();
      if let Some(md_path) = find_md_arg(&args) {
        emit_open_file(&app.handle(), &md_path);
      }

      Ok(())
    })
    .on_window_event(|window, event| {
      if let tauri::WindowEvent::DragDrop(drop_event) = event {
        if let tauri::DragDropEvent::Drop { paths, position: _ } = drop_event {
          for path in paths {
            if path.extension().is_some_and(|ext| ext == "md" || ext == "markdown") {
              if let Some(path_str) = path.to_str() {
                emit_open_file(&window.app_handle(), path_str);
              }
              break;
            }
          }
        }
      }
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
