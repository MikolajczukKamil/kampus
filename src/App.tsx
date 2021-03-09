import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { Header } from './Header'
import { Map } from './Map'

export function App() {
  return (
    <CssBaseline>
      <Header />
      <Map />
    </CssBaseline>
  )
}
