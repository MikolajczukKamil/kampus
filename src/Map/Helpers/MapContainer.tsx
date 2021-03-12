import React, { ReactNode, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

import { MapLayer } from './MapLayer'

const useStyles = makeStyles({
  root: {
    overflow: 'hidden',
  },
})

interface IMapContainerProps {
  className?: string
  children: ReactNode
}

export const MapOverlay = ({ children }: { children: ReactNode }) => children
export const MapContent = ({ children }: { children: ReactNode }) => children

export function MapContainer({ children, className }: IMapContainerProps) {
  const classes = useStyles()
  const rootRef = useRef<HTMLDivElement>(null)

  return (
    <div className={ clsx(className, classes.root) } ref={ rootRef }>
      <MapLayer rootRef={ rootRef }>
        { children }
      </MapLayer>

      <div>
        { }
      </div>
    </div>
  )
}
