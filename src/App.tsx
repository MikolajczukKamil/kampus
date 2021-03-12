import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { Header } from './Header'
import { Map, MapContextProvider } from './Map'

export function App() {
  return (
    <CssBaseline>
      <MapContextProvider>
        <Header/>

        <Map/>
      </MapContextProvider>
    </CssBaseline>
  )
}
