import { IMap } from '../IMap'
import { IPosition } from './IPosition'
import { Vector } from './Vector'

export function positionToPixel(map: IMap, position: IPosition): Vector {
  const mapWidth: number = map.bottomRight.lon - map.topLeft.lon
  const mapHeight: number = map.bottomRight.lat - map.topLeft.lat

  return new Vector(
    ((position.lon - map.topLeft.lon) / mapWidth) * map.height,
    ((position.lat - map.topLeft.lat) / mapHeight) * map.width,
  )
}
