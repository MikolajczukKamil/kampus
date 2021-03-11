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
      <ContainerMap map={map} rootRef={rootRef}>
        {children}
        <div
          style={{
            transform: 'translate(100px, 200px)',
            maxWidth: 70,
            height: 50,
            background: 'red',
            padding: 8,
          }}
        >
          Lorem
          <div
            style={{
              background: 'blue',
              color: 'wheat'
            }}

            onClick={() => console.warn("click")}
          >
            Ipsum
          </div>
        </div>
      </ContainerMap>
    </div>
  )
}
