import { RgbaColor } from 'react-colorful'

export type SourceType = 'color' | 'media'
export type MediaType = 'image' | 'video'

export type ColorConfigType = {
  type: 'color'
  data: {
    primary: RgbaColor
    secondary: RgbaColor
  }
}

export type ImageConfigType = {
  type: 'image'
  data: {
    path: string
    format: string
  }
}

export type VideoConfigType = {
  type: 'video'
  data: {
    path: string
    format: string
  }
}

export type StoreType = {
  activated: string
  map: {
    [id: string]: ColorConfigType | ImageConfigType | VideoConfigType
  }
}

export type ConfigStoreType = {
  config: StoreType
}
