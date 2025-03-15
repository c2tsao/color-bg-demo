export type ColorConfigType = {
  type: 'color'
  data: {
    primary: [number, number, number, number]
    secondary: [number, number, number, number]
  }
}

export type ImageConfigType = {
  type: 'image'
  data: {
    path: string
  }
}

export type VideoConfigType = {
  type: 'video'
  data: {
    path: string
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
