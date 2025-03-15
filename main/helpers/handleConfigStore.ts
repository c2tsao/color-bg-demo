import Store from 'electron-store'
import { ipcMain } from 'electron'
import { ConfigStoreType } from '../../types/configStoreType'

const store = new Store<ConfigStoreType>({ name: 'config' })

export function initConfigStoreHandler() {
  ipcMain.handle('configStore:get', () => {
    const config = store.get('config') || []
    return config
  })

  ipcMain.on('configStore:set', (_event, arg: string[]) => {
    store.set('config', arg)
  })
}
