import React, { useContext, useState } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Slider from '@material-ui/core/Slider'
import Paper from '@material-ui/core/Paper'
import Dialog from '@material-ui/core/Dialog'
import Button from '@material-ui/core/Button'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

import { MapContainer } from './Helpers/MapContainer'
import { Marker } from './Elements/Marker'
import { IPlace } from './IPlace'
import { MapLayer } from './Helpers/MapLayer'
import simpleMakers from './simple.markers.json'
import { MapContext } from './MapContext'

const makers = simpleMakers as IPlace[]

const useStyles = makeStyles((theme: Theme) => ({
  zoom: {
    width: 300,
    margin: theme.spacing(),
    padding: theme.spacing(2),
  },
  zoomSlider: {
    marginTop: theme.spacing(5),
  },
  someImg: {
    width: '100%',
    maxWidth: 512
  },
}))

export function Map() {
  const classes = useStyles()
  const { scale, updateScale } = useContext(MapContext)
  const [ selectedPlace, setSelectedPlace ] = useState<IPlace | null>(null)

  const handleChangeScale = (ev: any, value: number | number[]) => {
    updateScale(value as number)
  }

  const handleOpenDialog = (place: IPlace) => {
    setSelectedPlace(place)
  }

  const handleCloseDialog = () => {
    setSelectedPlace(null)
  }

  return (
    <>
      <MapContainer>
        <MapLayer>
          {
            makers.map((place: IPlace) =>
              <Marker key={ place.shortName }
                      position={ place.position }
                      title={ place.shortName }
                      onClick={ () => handleOpenDialog(place) }
              />,
            )
          }
        </MapLayer>

        <Paper className={ classes.zoom }>
          <Typography gutterBottom>Zoom</Typography>

          <Slider
            value={ scale }
            step={ 0.1 }
            min={ 0.1 }
            max={ 10 }
            className={ classes.zoomSlider }
            valueLabelDisplay="on"
            onChange={ handleChangeScale }
          />
        </Paper>
      </MapContainer>

      <Dialog
        open={ selectedPlace !== null }
        onClose={ handleCloseDialog }
      >
        <DialogTitle>{ selectedPlace?.shortName }</DialogTitle>

        <DialogContent>
          <DialogContentText>
            { selectedPlace?.longName }
          </DialogContentText>

          {
            selectedPlace?.positions.map(pos => (
                <div key={ pos.name }>
                  <Typography>{ pos.name }</Typography>

                  { pos.image && <img src={ pos.image } className={ classes.someImg } alt=""/> }
                </div>
              ),
            )
          }
        </DialogContent>

        <DialogActions>
          <Button onClick={ handleCloseDialog } color="primary" variant="contained">OK</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
