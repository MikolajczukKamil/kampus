import { IMap } from '../IMap'
import { IPosition } from './IPosition'
import { Vector } from './Vector'

export function positionToPiksel(map: IMap, position: IPosition): Vector {
  const mapWidth: number = map.bottomRight.lat - map.topLeft.lat
  const mapHeight: number = map.bottomRight.lon - map.topLeft.lon

console.warn(mapWidth, mapHeight)
  return new Vector(
    Math.round(((position.lat - map.topLeft.lat) / mapWidth) * map.width),
    Math.round(((position.lon - map.topLeft.lon) / mapHeight) * map.height)
  )
}
