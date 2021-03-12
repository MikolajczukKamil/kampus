import React from 'react'
import { MapContainer } from './Elements/Helpers/MapContainer'
import { Marker } from './Elements/Marker'

export function Map() {
  return (
    <MapContainer>
      <Marker position={ { lat: 52.16211895796358, lon: 21.04632866670382 } }/>
      <div onMouseDown={e => e.stopPropagation()} style={{ background: 'red', width: 100, height: 100 }}>Ala ma kota</div>
    </MapContainer>
  )
}
