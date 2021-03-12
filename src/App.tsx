import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'

import { Map, MapContextProvider } from './Map'
import { Header } from './Header'

export function App() {
  return (
    <MapContextProvider>
      <CssBaseline/>

      <Header/>
      <Map/>
    </MapContextProvider>
  )
}
