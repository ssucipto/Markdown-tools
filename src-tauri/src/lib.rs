#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  use tauri::{Emitter, Manager};

  tauri::Builder::default()
    .setup(|app| {
      if cfg!(debug_assertions) {
        app.handle().plugin(
          tauri_plugin_log::Builder::default()
            .level(log::LevelFilter::Info)
            .build(),
        )?;
      }

      let args: Vec<String> = std::env::args().collect();
      if let Some(md_path) = args.iter().skip(1).find(|a| a.ends_with(".md") || a.ends_with(".markdown")) {
        if let Some(window) = app.get_webview_window("main") {
          if let Ok(content) = std::fs::read_to_string(md_path) {
            let _ = window.emit(
              "open-file-content",
              serde_json::json!({ "path": md_path, "content": content }),
            );
          }
        }
      }

      Ok(())
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
