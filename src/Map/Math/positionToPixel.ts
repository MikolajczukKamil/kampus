import { IMap } from '../IMap'
import { IPosition } from './IPosition'
import { Vector } from './Vector'

export function positionToPixel(map: IMap, position: IPosition): Vector {
  const mapWidth: number = map.bottomRight.lat - map.topLeft.lat
  const mapHeight: number = map.bottomRight.lon - map.topLeft.lon

  return new Vector(
    ((position.lat - map.topLeft.lat) / mapWidth) * map.width,
    ((position.lon - map.topLeft.lon) / mapHeight) * map.height,
  )
}
