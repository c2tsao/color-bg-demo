import React from 'react'
import { useStore } from '../hooks/useStore'

function ControlPanel() {
  const { state, dispatch } = useStore()

  return (
    <>
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
    </>
  )
}

export default ControlPanel
