import { dialog, ipcMain } from 'electron'
import path from 'path'
import fs from 'fs'

export function initFileIOHandlers(app: Electron.App) {
  async function handleFileOpen() {
    const imageExts = ['jpg', 'png', 'gif']
    const videoExts = ['mkv', 'avi', 'mp4']
    const { canceled, filePaths } = await dialog.showOpenDialog({
      filters: [
        { name: 'All', extensions: [...imageExts, ...videoExts] },
        { name: 'Images', extensions: imageExts },
        { name: 'Movies', extensions: videoExts },
      ],
    })
    if (!canceled) {
      const mediaPath = path.join(app.getPath('userData'), '\/media')
      if (!fs.existsSync(mediaPath)) {
        fs.mkdirSync(mediaPath)
      }
      const id = new Date().valueOf()
      const ext = path.extname(filePaths[0])
      const newFilePath = path.join(mediaPath, `${id}${ext}`)
      fs.cpSync(filePaths[0], newFilePath)

      const type = videoExts.includes(ext.substring(1)) ? 'video' : 'image'
      return {
        filepath: newFilePath,
        id,
        type,
        format: `${type}/${ext.substring(1)}`,
      }
    }
    return undefined
  }

  async function readAppDataFile(filepath: string) {
    const fullPath = path.join(app.getPath('userData'), '\/', filepath)
    const data = fs.readFileSync(fullPath)
    return data
  }

  ipcMain.handle('dialog:openFile', handleFileOpen)
  ipcMain.handle('getAppDataPath', () => {
    return app.getPath('userData')
  })
  ipcMain.on('readAppDataFile', async (event, filepath: string) => {
    event.returnValue = await readAppDataFile(filepath)
  })
  ipcMain.on('readfile', async (event, filepath: string) => {
    event.returnValue = await fs.readFileSync(filepath)
  })
}
