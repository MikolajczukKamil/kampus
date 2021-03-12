import { IPosition } from './Math/IPosition'

export interface IDescriptionPosition {
  name: string
  image?: string
}

export interface IPlace {
  shortName: string
  longName?: string
  position: IPosition
  positions: IDescriptionPosition[]
}
