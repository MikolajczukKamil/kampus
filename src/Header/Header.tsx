import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import { makeStyles, Theme } from '@material-ui/core/styles'

import logo from '../img/ApplicationLogo.min.png'

const useStyles = makeStyles((theme: Theme) => ({
    logo: {
      height: theme.spacing(3),
      [theme.breakpoints.up('sm')]: {
        height: theme.spacing(4),
      },
    },
  }),
)

export function Header() {
  const classes = useStyles()

  return (
    <AppBar position="static">
      <Toolbar>
        <img src={ logo } className={ classes.logo } alt=""/>
      </Toolbar>
    </AppBar>
  )
}
