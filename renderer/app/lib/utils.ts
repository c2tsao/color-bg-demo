import { StoreType } from '../../../types/configStoreType'

export function getRGBA(state: StoreType): string {
  const config = state.map[state.activated]
  if (config && config.type === 'color') {
    const data = config.data
    const r = data.primary[0] ?? 0
    const g = data.primary[1] ?? 0
    const b = data.primary[2] ?? 0
    const a = data.primary[3] ?? 1
    return `rgba(${r}, ${g}, ${b}, ${a})`
  }
  return 'rgba(0,0,0,1)'
}
