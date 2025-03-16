import { RgbaColor } from 'react-colorful'

export function getStyleColorString(color: RgbaColor) {
  const r = color.r
  const g = color.g
  const b = color.b
  const a = color.a
  return `rgba(${r}, ${g}, ${b}, ${a})`
}

export function getContrastColor(color: RgbaColor) {
  const luma = (0.299 * color.r + 0.587 * color.g + 0.114 * color.b) / 255
  return luma > 0.5 ? 'black' : 'white'
}
