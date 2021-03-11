import React, { ReactNode, RefObject, useRef } from 'react'
import { makeStyles } from '@material-ui/core'
import { IMap } from './IMap'
import { useMapController } from './MapController'

const useStyles = makeStyles({
  map: {
    userSelect: 'none',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'left top',
    transformOrigin: 'top left',
    '& > *': {
      pointerEvents: 'none',
    },
  },
})

interface IContainerMapProps {
  map: IMap
  rootRef: RefObject<HTMLDivElement>
  children: ReactNode
}

export function ContainerMap({ map, children, rootRef }: IContainerMapProps) {
  const classes = useStyles()
  const mapRef = useRef<HTMLDivElement>(null)
  const controller = useMapController(mapRef, rootRef, map)

  return (
    <div
      ref={mapRef}
      className={classes.map}
      style={{
        backgroundImage: `url(${map.image})`,
        width: map.width,
        height: map.height,
        transform: controller.Transform,
      }}
      /** Desktop */
      onMouseDown={controller.handleStartMovingDesktop}
      onMouseUp={controller.handleStopMoving}
      onMouseOut={controller.handleStopMoving}
      /** Mobile */
      onTouchStart={controller.handleStartMovingMobile}
      onTouchEnd={controller.handleStopMoving}
      onTouchCancel={controller.handleStopMoving}
    >
      {children}
    </div>
  )
}
