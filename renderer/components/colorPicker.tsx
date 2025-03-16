import React from 'react'
import { RgbaColorPicker, RgbaColor } from 'react-colorful'
import { getContrastColor } from '../lib/utils'

type Props = {
  primaryColor: RgbaColor
  secondaryColor: RgbaColor
  setPrimaryColor: (color: RgbaColor) => void
  setSecondaryColor: (color: RgbaColor) => void
}

function ColorPicker(props: Props) {
  const { primaryColor, secondaryColor, setPrimaryColor, setSecondaryColor } = props
  return (
    <div className="h-5/6 grid grid-rows-4 grid-cols-2 gap-2 pb-4">
      <RgbaColorPicker
        className="!w-full !h-full row-start-1 row-end-4"
        color={primaryColor}
        onChange={setPrimaryColor}
      />
      <RgbaColorPicker
        className="!w-full !h-full row-start-1 row-end-4"
        color={secondaryColor}
        onChange={setSecondaryColor}
      />
      <div
        className="row-start-4 flex items-center justify-center"
        style={{
          color: getContrastColor(primaryColor),
          backgroundColor: `rgba(${primaryColor.r}, ${primaryColor.g}, ${primaryColor.b}, ${primaryColor.a})`,
        }}
      >
        Primary
      </div>
      <div
        className="row-start-4 flex items-center justify-center"
        style={{
          color: getContrastColor(secondaryColor),
          backgroundColor: `rgba(${secondaryColor.r}, ${secondaryColor.g}, ${secondaryColor.b}, ${secondaryColor.a})`,
        }}
      >
        Secondary
      </div>
    </div>
  )
}

export default ColorPicker
