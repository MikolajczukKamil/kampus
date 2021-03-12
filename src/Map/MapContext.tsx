import React, { createContext, ReactNode, useCallback, useState } from 'react'
import { IMap } from './IMap'
import simpleMap from './simple-map.json'

interface IMapContextValue {
  map: IMap
  scale: number
  updateScale(scale: number): void
}

const defaultValue: IMapContextValue = {
  map: {
    image: '',
    width: 0,
    height: 0,
    topLeft: { lon: 0, lat: 0 },
    bottomRight: { lon: 0, lat: 0 },
    startPosition: { x: 0, y: 0 },
  },
  scale: 0,
  updateScale: () => void 0
}

export const MapContext = createContext<IMapContextValue>(defaultValue)

interface IMapContextProviderProps {
  children: ReactNode
}

export function MapContextProvider({ children }: IMapContextProviderProps) {
  const [ map ] = useState<IMap>(simpleMap)
  const [ scale, setScale ] = useState(1)

  const updateScale = useCallback((newScale: number) => {
    if (newScale <= 0 || newScale >= 100) return

    setScale(newScale)
  }, [])

  return <MapContext.Provider value={ { map, scale, updateScale } }>{ children }</MapContext.Provider>
}
