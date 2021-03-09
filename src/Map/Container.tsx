import React, { ReactNode, useContext, useRef } from 'react'
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles'
import { MapContext } from './MapContext'
import { ContainerMap } from './ContainerMap'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flex: 1,
      overflow: 'hidden',
    },
    map: {
      transform: 'translate(0px, 0px)',
    },
  })
)

interface IContainerProps {
  children: ReactNode
}

export function Container({ children }: IContainerProps) {
  const classes = useStyles()
  const rootRef = useRef<HTMLDivElement>(null)
  const { map } = useContext(MapContext)

  return (
    <div className={classes.root} ref={rootRef}>
      <ContainerMap className={classes.map} map={map} rootRef={rootRef}>
        {children}
      </ContainerMap>
    </div>
  )
}
