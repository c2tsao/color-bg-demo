import React from 'react'
import { useStore } from '../hooks/useStore'
import { StoreType } from '../../types/configStoreType'
import { getStyleColorString } from '../lib/utils'

function Gallery() {
  const { state, dispatch } = useStore()
  const isDeleteDisabled = Object.keys(state.map).length <= 1 && state.map.constructor === Object
  const deleteItem = (evt, id: string) => {
    evt.stopPropagation()
    if (isDeleteDisabled) {
      return
    }
    dispatch({ type: 'remove', payload: { ...state, activated: id } })
  }

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
          className="rounded w-[150px] h-[80px] shadow-sm border border-stone-100 mx-1 cursor-pointer relative"
          style={{
            backgroundColor: getStyleColorString(item[1].data.secondary),
          }}
          onClick={apply}
        >
          <div
            className="absolute rounded-full w-6 h-6 top-0 right-0 text-center cursor-pointer"
            style={{ display: isDeleteDisabled ? 'none' : 'block' }}
            onClick={e => deleteItem(e, item[0])}
          >
            &#x2715;
          </div>
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
          className="relative flex justify-center items-center bg-rose-900 opacity-90 text-white rounded w-[150px] h-[80px] shadow-sm mx-1 cursor-pointer border border-stone-100"
          onClick={apply}
        >
          <div
            className="absolute rounded-full w-6 h-6 top-0 right-0 text-center cursor-pointer"
            style={{ display: isDeleteDisabled ? 'none' : 'block' }}
            onClick={e => deleteItem(e, item[0])}
          >
            &#x2715;
          </div>
          {'IMAGE'}
        </div>
      )
    }

    return (
      <div
        key={item[0]}
        className="relative flex justify-center items-center bg-indigo-900 opacity-90 text-white rounded w-[150px] h-[80px] shadow-sm mx-1 cursor-pointer border border-stone-100"
        onClick={apply}
      >
        <div
          className="absolute rounded-full w-6 h-6 top-0 right-0 text-center cursor-pointer"
          style={{ display: isDeleteDisabled ? 'none' : 'block' }}
          onClick={e => deleteItem(e, item[0])}
        >
          &#x2715;
        </div>
        {'VIDEO'}
      </div>
    )
  })
  return <div className="flex justify-center w-full absolute bottom-4">{items}</div>
}

export default Gallery
