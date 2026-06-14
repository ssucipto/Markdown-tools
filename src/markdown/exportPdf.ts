export { exportPdfDocument } from './exportWord'

export function openPdfPrintWindow(html: string, _title: string): boolean {
  const printWindow = window.open('', '_blank', 'width=800,height=600')
  if (!printWindow) return false
  printWindow.document.write(html)
  printWindow.document.close()
  printWindow.focus()
  printWindow.print()
  setTimeout(() => printWindow.close(), 500)
  return true
}
