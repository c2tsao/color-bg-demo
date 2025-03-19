import path from 'path'
import { app, ipcMain, shell } from 'electron'
import serve from 'electron-serve'
import { createWindow, initFileIOHandlers, initConfigStoreHandler } from './helpers'
import { IPC_WINDOW_READY_TO_SHOW } from '../constants/ipc'

const isProd = process.env.NODE_ENV === 'production'

if (isProd) {
  serve({ directory: 'app' })
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`)
}

;(async () => {
  await app.whenReady()

  const mainWindow = createWindow('main', {
    width: 1000,
    minWidth: 750,
    height: 600,
    minHeight: 500,
    show: false,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  if (isProd) {
    await mainWindow.loadURL('app://./home')
  } else {
    const port = process.argv[2]
    await mainWindow.loadURL(`http://localhost:${port}/home`)
    mainWindow.webContents.openDevTools()
  }

  ipcMain.handle(IPC_WINDOW_READY_TO_SHOW, () => {
    mainWindow.show()
  })
})()

app.on('window-all-closed', () => {
  app.quit()
})

ipcMain.handle('openLink', () => {
  shell.openExternal('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
})

initFileIOHandlers(app)
initConfigStoreHandler()
