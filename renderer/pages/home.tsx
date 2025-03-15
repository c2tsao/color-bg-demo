import React, { useState } from 'react'
import Head from 'next/head'
import { useStore } from '../hooks/useStore'
import { getRGBA } from '../lib/utils'
import { StoreType } from '../../types/configStoreType'
import ControlPanel from '../components/controlPanel'

export default function HomePage() {
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

  React.useEffect(() => {
    if (initialized) {
      window.ipc.send('configStore:set', {
        activated: `${state.activated}`,
      })
    }
  }, [state.activated])

  return (
    <React.Fragment>
      <Head>
        <title>Color Background Demo</title>
      </Head>
      <div
        className="w-screen h-screen"
        style={{
          transition: `all .5s`,
          backgroundColor: getRGBA(state),
        }}
      >
        {state.activated}
        <ControlPanel></ControlPanel>
      </div>
    </React.Fragment>
  )
}
