import { dialog, ipcMain } from 'electron'
import path from 'path'
import fs from 'fs'
import {
  IPC_FILE_IO_OPEN_DIALOG,
  IPC_FILE_IO_GET_APP_DATA_PATH,
  IPC_FILE_IO_READ_APP_DATA_FILE,
  IPC_FILE_IO_READ_FILE,
} from '../../constants/ipc'

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
      const stats = fs.statSync(filePaths[0])
      const fileSizeInBytes = stats.size
      const fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024)
      console.log(fileSizeInMegabytes)
      if (fileSizeInMegabytes > 1) {
        return {
          error: 'sizeLimit',
        }
      }

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
        error: false,
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

  ipcMain.handle(IPC_FILE_IO_OPEN_DIALOG, handleFileOpen)
  ipcMain.handle(IPC_FILE_IO_GET_APP_DATA_PATH, () => {
    return app.getPath('userData')
  })
  ipcMain.on(IPC_FILE_IO_READ_APP_DATA_FILE, async (event, filepath: string) => {
    event.returnValue = await readAppDataFile(filepath)
  })
  ipcMain.on(IPC_FILE_IO_READ_FILE, async (event, filepath: string) => {
    event.returnValue = await fs.readFileSync(filepath)
  })
}
