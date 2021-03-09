import React, { useRef } from 'react'
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flex: 1,
      background: 'rgb(100, 100, 100, 0.5)',
    },
  })
)

export function Map() {
  const classes = useStyles()
  const rootRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={rootRef} className={classes.root}>
      Mapa
    </div>
  )
}
