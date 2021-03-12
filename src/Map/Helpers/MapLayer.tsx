import React, { ReactNode, RefObject, useContext, useRef } from 'react'
import { makeStyles } from '@material-ui/core'
import { useMapController } from './MapController'
import { MapContext } from '../MapContext'

const useStyles = makeStyles({
  map: {
    userSelect: 'none',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'left top',
    transformOrigin: 'top left',
    position: 'relative',
    '& > *': {
      pointerEvents: 'none',
      position: 'absolute',
    },
  },
})

interface IMapLayerProps {
  rootRef: RefObject<HTMLDivElement>
  children: ReactNode
}

export function MapLayer({ children, rootRef }: IMapLayerProps) {
  const classes = useStyles()
  const { map } = useContext(MapContext)
  const mapRef = useRef<HTMLDivElement>(null)
  const controller = useMapController(mapRef, rootRef)

  return (
    <div
      ref={ mapRef }
      className={ classes.map }
      style={ {
        backgroundImage: `url(${ map.image })`,
        width: map.width,
        height: map.height,
        transform: controller.Transform,
      } }
      /** Desktop */
      onMouseDown={ controller.handleStartMovingDesktop }
      onMouseUp={ controller.handleStopMoving }
      onMouseOut={ controller.handleStopMoving }
      /** Mobile */
      onTouchStart={ controller.handleStartMovingMobile }
      onTouchEnd={ controller.handleStopMoving }
      onTouchCancel={ controller.handleStopMoving }
    >
      { children }
    </div>
  )
}
