import React from 'react'
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles'
import { Container } from './Container'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
  })
)

export function Map() {
  const classes = useStyles()

  return <Container>Mapa</Container>
}
