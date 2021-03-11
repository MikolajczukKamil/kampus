import React, { ReactNode, useContext, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { MapContext } from './MapContext'
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
  const { map } = useContext(MapContext)

  return (
    <div className={classes.root} ref={rootRef}>
      <MapLayer map={map} rootRef={rootRef}>
        {children}
      </MapLayer>
    </div>
  )
}
