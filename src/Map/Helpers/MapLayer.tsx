import React, { ReactNode, useContext, useRef } from 'react'
import { makeStyles } from '@material-ui/core'
import { useMapController } from './MapController'
import { MapContext } from '../MapContext'
import { MapInstanceContext } from '../Elements/MapInstanceContext'

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
  children: ReactNode
}

export function MapLayer({ children }: IMapLayerProps) {
  const classes = useStyles()
  const { map } = useContext(MapContext)
  const mapRef = useRef<HTMLDivElement>(null)
  const rootRef = useContext(MapInstanceContext)
  const controller = useMapController(mapRef, rootRef)

  return (
    <div style={ {
      width: map.width,
      height: map.height,
    } }>
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
    </div>
  )
}
