import React from 'react'
import { MapContainer } from './MapContainer'
import { Marker } from './Elements/Marker'

export function Map() {
  return (
    <MapContainer>
      <Marker position={{ lat: 52.16211895796358, lon: 21.04632866670382 }} />
    </MapContainer>
  )
}
