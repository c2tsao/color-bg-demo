import React from 'react'
import { useStore } from '../hooks/useStore'

type PropsType = {
  openModal: () => void
  setConfigType: (type: 'color' | 'media') => void
}

function ControlPanel(props: PropsType) {
  const { state, dispatch } = useStore()

  // list and select data
  const keys = Object.keys(state.map)
  return (
    <div className="flex justify-center w-full relative py-4">
      <button
        className="btn-default mx-1"
        onClick={() => {
          props.setConfigType('color')
          props.openModal()
        }}
      >
        Add color
      </button>
      <button
        className="btn-default mx-1"
        onClick={() => {
          props.setConfigType('media')
          props.openModal()
        }}
      >
        Add Media
      </button>
      <button
        className="btn-default mx-1"
        disabled={keys.length <= 1}
        onClick={() => {
          dispatch({ type: 'remove', payload: { ...state, activated: keys[0] } })
        }}
      >
        delete
      </button>
    </div>
  )
}

export default ControlPanel
