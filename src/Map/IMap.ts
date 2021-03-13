import { IPosition } from './Math/IPosition'
import { Vector } from './Math/Vector'

export interface IMap {
  /** Url */
  image: string
  topLeft: IPosition
  bottomRight: IPosition
  width: number
  height: number
  startPosition: Vector
}
