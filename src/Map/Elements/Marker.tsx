import React, { useContext, useMemo } from 'react'
import { makeStyles, Theme } from '@material-ui/core'
import { MarkerPoint } from './MarkerPoint'
import { IPosition } from '../Math/IPosition'
import { positionToPiksel } from '../Math/positionToPiksel'
import { MapContext } from '../MapContext'

/** In px */
const MARKER_SIZE = 32
const HALF_MARKER_SIZE = MARKER_SIZE / 2

const useStyles = makeStyles({
  root: {
    width: MARKER_SIZE,
    height: MARKER_SIZE,
  },
})

interface IMarkerProps {
  position: IPosition
}

export function Marker({ position }: IMarkerProps) {
  const classes = useStyles()
  const { map } = useContext(MapContext)
  const place = useMemo(() => positionToPiksel(map, position), [
    position.lat,
    position.lon,
  ])

  return (
    <MarkerPoint
      className={classes.root}
      style={{
        color: 'red',
        transform: `translate(${place.x - HALF_MARKER_SIZE}px, ${
          place.y - HALF_MARKER_SIZE
        }px)`,
      }}
    />
  )
}
