import React from 'react'
import { useStore } from '../hooks/useStore'
import { StoreType } from '../../types/configStoreType'
import { getContrastColor, getStyleColorString } from '../lib/utils'

function Gallery() {
  const { state, dispatch } = useStore()
  const items = Object.entries(state.map).map(item => {
    const apply = () => {
      const id = item[0]
      const payload: StoreType = {
        ...state,
        activated: id,
      }
      dispatch({ type: 'update', payload })
    }
    if (item[1].type === 'color') {
      return (
        <div
          key={item[0]}
          className="rounded w-[150px] h-[80px] shadow-sm border border-stone-100 mx-1 cursor-pointer"
          style={{
            backgroundColor: getStyleColorString(item[1].data.secondary),
          }}
          onClick={apply}
        >
          <div
            className="w-full h-2/3 rounded-t-sm"
            style={{
              backgroundColor: getStyleColorString(item[1].data.primary),
            }}
          ></div>
        </div>
      )
    }
    if (item[1].type === 'image') {
      return (
        <div
          key={item[0]}
          className="flex justify-center items-center bg-rose-900 opacity-90 text-white rounded w-[150px] h-[80px] shadow-sm mx-1 cursor-pointer border border-stone-100"
          onClick={apply}
        >
          {'IMAGE'}
        </div>
      )
    }
    return (
      <div
        key={item[0]}
        className="flex justify-center items-center bg-indigo-900 opacity-90 text-white rounded w-[150px] h-[80px] shadow-sm mx-1 cursor-pointer border border-stone-100"
        onClick={apply}
      >
        {'VIDEO'}
      </div>
    )
  })
  return <div className="flex justify-center w-full absolute bottom-4">{items}</div>
}

export default Gallery
