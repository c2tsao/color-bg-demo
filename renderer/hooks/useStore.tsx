import React, { createContext, useContext, useReducer } from 'react'
import { StoreType } from '../../types/configStoreType'

type ActionType = { type: string; payload?: StoreType }

const defaultState: StoreType = {
  activated: '',
  map: {
    '0': { type: 'color', data: { primary: [255, 0, 0, 1], secondary: [255, 0, 0, 1] } },
    '1': { type: 'color', data: { primary: [0, 255, 0, 1], secondary: [0, 255, 0, 1] } },
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
      return {
        activated: action.payload?.activated ?? defaultState.activated,
        map: { ...(action.payload?.map ?? defaultState.map) },
      }
    case 'increment':
      return { ...state, activated: `${+state.activated + 1}` }
    case 'decrement':
      return { ...state, activated: `${+state.activated - 1}` }
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
