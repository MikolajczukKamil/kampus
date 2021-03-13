import React, { SVGProps, useContext, useMemo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'

import clsx from 'clsx'

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
    cursor: 'pointer',
  },
})

interface IMarkerProps extends SVGProps<SVGSVGElement> {
  position: IPosition
  title?: string
}

export function Marker({ position, className, title, style = {}, ...other }: IMarkerProps) {
  const classes = useStyles()
  const { map, scale } = useContext(MapContext)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const place = useMemo(() => positionToPixel(map, position), [ position.lat, position.lon ])

  const marker = <MarkerPoint
    className={ clsx(classes.root, className) }
    style={ {
      ...style,
      width: MARKER_SIZE / scale,
      height: MARKER_SIZE / scale,
      transform: `translate(${ place.x - HALF_MARKER_SIZE }px, ${ place.y - MARKER_SIZE }px)`,
    } }
    { ...other }
  />

  if (title) {
    return (
      <Tooltip title={ title }>
        { marker }
      </Tooltip>
    )
  }

  return marker
}
