export interface TabDocument {
  id: string
  documentPath: string | null
  content: string
  title: string
}

export interface DocumentWorkspaceState {
  tabs: TabDocument[]
  activeTabId: string | null
  explorerCollapsed: boolean
}
