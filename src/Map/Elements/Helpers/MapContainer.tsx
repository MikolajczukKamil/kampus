import React, { ReactNode, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { MapLayer } from './MapLayer'

const useStyles = makeStyles({
  root: {
    flex: 1,
    overflow: 'hidden',
  },
})

interface IMapContainerProps {
  children: ReactNode
}

export function MapContainer({ children }: IMapContainerProps) {
  const classes = useStyles()
  const rootRef = useRef<HTMLDivElement>(null)

  return (
    <div className={ classes.root } ref={ rootRef }>
      <MapLayer rootRef={ rootRef }>
        { children }
      </MapLayer>
    </div>
  )
}
