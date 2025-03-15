import { dialog, ipcMain } from 'electron'

async function handleFileOpen() {
  const { canceled, filePaths } = await dialog.showOpenDialog({})
  if (!canceled) {
    return filePaths[0]
  }
}

export function initDialogHandlers() {
  ipcMain.handle('dialog:openFile', handleFileOpen)
}
