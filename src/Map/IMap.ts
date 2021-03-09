export interface IPosition {
  lat: number
  lon: number
}

export interface Vector {
  x: number
  y: number
}

export interface IMap {
  /** Url */
  image: string
  topLeft: IPosition
  bottomRight: IPosition
  width: number
  height: number
  startPosition: Vector
}
