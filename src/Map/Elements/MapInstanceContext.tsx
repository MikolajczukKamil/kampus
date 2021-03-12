import { createContext, RefObject } from 'react'

type IMapInstanceContextValue = RefObject<HTMLDivElement>

const defaultValue: IMapInstanceContextValue = {
  current: null,
}

export const MapInstanceContext = createContext<IMapInstanceContextValue>(defaultValue)
