import React, { useState } from 'react'
import Head from 'next/head'
import { useStore } from '../app/hooks/useStore'
import { getRGBA } from '../app/lib/utils'

export default function HomePage(props) {
  const { state, dispatch } = useStore()

  React.useEffect(() => {
    if (props.initialized) {
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
        <button
          className="btn-blue"
          onClick={() => {
            dispatch({ type: 'increment' })
          }}
        >
          increment
        </button>
        <button
          className="btn-blue"
          onClick={() => {
            dispatch({ type: 'decrement' })
          }}
        >
          decrement
        </button>

        <button
          className="btn-blue"
          onClick={() => {
            window.ipc.invoke('dialog:openFile')
          }}
        >
          open file
        </button>
      </div>
    </React.Fragment>
  )
}
