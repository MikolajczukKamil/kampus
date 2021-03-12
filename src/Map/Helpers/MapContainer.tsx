import React, { ReactNode, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

import { MapInstanceContext } from '../Elements/MapInstanceContext'

const useStyles = makeStyles({
  root: {
    flex: 1,
    overflow: 'hidden',
    position: 'relative',
    '& > *': {
      position: 'absolute',
    },
  },
})

interface IMapContainerProps {
  className?: string
  children: ReactNode
}

export function MapContainer({ children, className }: IMapContainerProps) {
  const classes = useStyles()
  const rootRef = useRef<HTMLDivElement>(null)

  return (
    <MapInstanceContext.Provider value={ rootRef }>
      <div className={ clsx(className, classes.root) } ref={ rootRef }>
        { children }
      </div>
    </MapInstanceContext.Provider>

  )
}
