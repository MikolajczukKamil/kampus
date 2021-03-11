import { useState } from 'react'
import { IMap } from './IMap'
import simpleMap from './simple-map.json'

export function useSimpleMap() {
  const [map] = useState<IMap>(simpleMap)

  return map
}
