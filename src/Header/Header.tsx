import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(({
    title: {
      flexGrow: 1,
    },
  }),
)

export function Header() {
  const classes = useStyles()

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={ classes.title }>
          Kampus SGGW
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
