import React from 'react'
import { useStore } from '../hooks/useStore'

type PropsType = {
  openModal: () => void
  setConfigType: (type: 'color' | 'media') => void
}

function ControlPanel(props: PropsType) {
  const { state } = useStore()

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
        {'Add Color'}
      </button>
      <button
        className="btn-default mx-1"
        onClick={() => {
          props.setConfigType('media')
          props.openModal()
        }}
      >
        {'Add Media'}
      </button>
    </div>
  )
}

export default ControlPanel
