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
