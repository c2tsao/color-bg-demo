import React from 'react'
import type { AppProps } from 'next/app'
import { StoreProvider } from '../app/hooks/useStore'
import { useStore } from '../app/hooks/useStore'
import { StoreType } from '../../types/configStoreType'

import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  const { state, dispatch } = useStore()
  const [initialized, setInitialized] = React.useState(false)

  React.useEffect(() => {
    async function runEffect() {
      const config = await window.ipc.invoke<StoreType>('configStore:get')
      dispatch({ type: 'init', payload: config })
      setInitialized(true)
      window.ipc.invoke('ready-to-show')
    }
    runEffect()
  }, [])

  return (
    <StoreProvider>
      <Component {...pageProps} initialized={initialized} />
    </StoreProvider>
  )
}

export default MyApp
