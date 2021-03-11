import React, { createContext, ReactNode } from 'react'
import { IMap } from './IMap'
import simpleMap from './simple-map.json'

interface IMapContextValue {
  map: IMap
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
}

export const MapContext = createContext<IMapContextValue>(defaultValue)

interface IMapContextProviderProps {
  children: ReactNode
}

export function MapContextProvider({ children }: IMapContextProviderProps) {
  const map: IMap = simpleMap

  return <MapContext.Provider value={{ map }}>{children}</MapContext.Provider>
}
