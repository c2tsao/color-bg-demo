import React from 'react'

type PropsType = {
  openModal: () => void
  setConfigType: (type: 'color' | 'media') => void
  disabled: boolean
  maxItemCounts: number
}

function ControlPanel(props: PropsType) {
  return (
    <>
      <p className="text-center" style={{ visibility: props.disabled ? 'visible' : 'hidden' }}>
        <span className="text-sm inline-block mask-bg px-2 rounded">{`Hint: Max ${props.maxItemCounts} Items`}</span>
      </p>
      <div className="flex justify-center w-full relative pt-1 pb-4">
        <button
          className="btn-default mx-1"
          onClick={() => {
            props.setConfigType('color')
            props.openModal()
          }}
          disabled={props.disabled}
        >
          {'Add Color'}
        </button>
        <button
          className="btn-default mx-1"
          onClick={() => {
            props.setConfigType('media')
            props.openModal()
          }}
          disabled={props.disabled}
        >
          {'Add Media'}
        </button>
      </div>
    </>
  )
}

export default ControlPanel
