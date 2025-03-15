import React from 'react'
import type { AppProps } from 'next/app'
import { StoreProvider } from '../hooks/useStore'

import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider>
      <Component {...pageProps} />
    </StoreProvider>
  )
}

export default MyApp
