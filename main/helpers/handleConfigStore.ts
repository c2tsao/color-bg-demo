import Store from 'electron-store'
import { ipcMain } from 'electron'
import { ConfigStoreType } from '../../types/configStoreType'
import { IPC_CONFIG_STORE_GET, IPC_CONFIG_STORE_SET } from '../../constants/ipc'

const store = new Store<ConfigStoreType>({ name: 'config' })

export function initConfigStoreHandler() {
  ipcMain.handle(IPC_CONFIG_STORE_GET, () => {
    const config = store.get('config') || undefined
    return config
  })

  ipcMain.on(IPC_CONFIG_STORE_SET, (_event, arg: string[]) => {
    store.set('config', arg)
  })
}
