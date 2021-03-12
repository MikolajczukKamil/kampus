import React, { useContext, useMemo } from 'react'
import { makeStyles } from '@material-ui/core'
import { MarkerPoint } from './MarkerPoint'
import { IPosition } from '../Math/IPosition'
import { positionToPixel } from '../Math/positionToPixel'
import { MapContext } from '../MapContext'
import { clickableOnMapMixin } from '../clickableOnMapMixin'

/** In px */
const MARKER_SIZE = 32
const HALF_MARKER_SIZE = MARKER_SIZE / 2

const useStyles = makeStyles({
  root: {
    ...clickableOnMapMixin(),
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const place = useMemo(() => positionToPixel(map, position), [ position.lat, position.lon ])

  return (
    <MarkerPoint
      onClick={() => console.warn("Marekr")}
      className={ classes.root }
      style={ { transform: `translate(${ place.x - HALF_MARKER_SIZE }px, ${ place.y - MARKER_SIZE }px)` } }
    />
  )
}
