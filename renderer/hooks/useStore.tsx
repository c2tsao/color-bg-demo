import React, { act, createContext, useContext, useReducer } from 'react'
import { StoreType } from '../../types/configStoreType'

type ActionType = { type: string; payload?: StoreType }

const defaultState: StoreType = {
  activated: '1',
  map: {
    '0': { type: 'color', data: { primary: { r: 176, g: 48, b: 82, a: 1 }, secondary: { r: 61, g: 3, b: 1, a: 1 } } },
    '1': { type: 'color', data: { primary: { r: 24, g: 35, b: 15, a: 1 }, secondary: { r: 31, g: 125, b: 83, a: 1 } } },
  },
}
const StoreContext = createContext<{
  state: StoreType
  dispatch: React.Dispatch<ActionType>
}>({
  state: defaultState,
  dispatch: () => {},
})

const reducer = (state: StoreType, action: ActionType) => {
  switch (action.type) {
    case 'init':
      if (!action.payload) {
        return { ...defaultState }
      }
      return {
        activated: action.payload.activated,
        map: { ...action.payload.map },
      }
    case 'update':
      return {
        activated: action.payload?.activated ?? state.activated,
        map: { ...(action.payload?.map ?? state.map) },
      }
    case 'remove':
      const keys = Object.keys(state.map)
      if (keys.length <= 1) return { ...state }

      const newKey = (() => {
        if (state.activated !== action.payload?.activated) {
          return state.activated
        }
        const found = keys.findIndex(id => id === action.payload?.activated)
        if (found - 1 < 0) {
          return keys[0]
        }
        return keys[found - 1]
      })()

      delete state.map[action.payload?.activated ?? '']
      return {
        activated: newKey,
        map: { ...state.map },
      }
    default:
      throw new Error()
  }
}

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, defaultState)

  return (
    <StoreContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  const context = useContext(StoreContext)
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider')
  }
  return context
}
