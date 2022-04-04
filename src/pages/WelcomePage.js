import React, { useMemo, useState, useEffect, useContext } from 'react'
import WelcomePageComponent from '../components/PagesComponents/WelcomePageComponent'
import { delegate } from '../delegate/delegate';
import {  LightSelector } from "../components/index"
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import { Link as RouterLink } from 'react-router-dom'
import { IconContext } from 'react-icons'
import { WiDayThunderstorm } from 'react-icons/wi'
import { store, actions, currentState } from '../WeatherContext';


function WelcomePage({}) {

    const [ciudadSeleccionada, setCiudadSeleccionada] = useState([]);
    // const [ciudadLatitud, setCiudadLatitud] = useState([]);
    // const [ciudadLongitud, setCiudadLongitud] = useState([]);

    const { state, dispatch } = useContext(store);

    const dataCiudades = [{ id: 1, descripcion: "Buenos Aires"}, { id: 2, descripcion: "Bogotá"}, { id: 3, descripcion: "Montevideo"}, { id: 4, descripcion: "Madrid" }, { id: 5, descripcion: "Miami" }, { id: 5, descripcion: "Lisboa" }]
    const iconContextSize = useMemo(() => ({ size:'6em'}), [])

    

    useEffect(() => {

        const paramsCoordenadas = {
            "q":ciudadSeleccionada.descripcion,
            "limit":"1",
            "appid": "a79966a6ea68d0d7625eff5a328cc0bb",
        }

        delegate.getCoordenadas(paramsCoordenadas).then(data => {
            
            const ciudad = data[0];
            
            // setCiudadLatitud(ciudad.lat);
            // setCiudadLongitud(ciudad.lon);

            if(ciudad !== null){
                dispatch({ type: actions.SET_LAT, payload: ciudad.lat });
                dispatch({ type: actions.SET_LON, payload: ciudad.lon });
                dispatch({ type: actions.SET_CITY, payload: ciudad.local_names.es });
            }
            

        }).catch(error => {
            dispatch({ type: actions.ALERT_ERROR, payload: error });
            
        });
    },[ciudadSeleccionada, dispatch])

    const handleChangeCiudad = (e) => {

        const targetEstadoSeleccionado = e.target.value;
        let dataCiudadSeleccionada = [];

        dataCiudadSeleccionada = dataCiudades.find(item => item.id == targetEstadoSeleccionado);

        setCiudadSeleccionada(dataCiudadSeleccionada);

    };
 console.log(currentState)
    
 return (
        <WelcomePageComponent>
            <Grid container
                direction="column"
                justify="center"
                className="full">
                <div className="highlight">
                    <Grid item container xs={12}
                        justify="center"
                        alignItems="center">
                        <Grid item>
                            <IconContext.Provider value={iconContextSize}>
                                <WiDayThunderstorm />
                            </IconContext.Provider>
                        </Grid>
                        <Grid item
                            container
                            direction="column"
                            justify="center"
                            alignItems="center">
                            <Typography variant="h4" color="inherit">
                                Clima Guru
                            </Typography>
                        </Grid>
                        <Grid item
                        container
                        direction="column"
                        justify="center"
                        alignItems="center">
                            <LightSelector
                                field="Ciudad"
                                name="id"
                                id="id"
                                value={ciudadSeleccionada}
                                description="descripcion"
                                onChange={handleChangeCiudad}
                                options={dataCiudades}
                            />
                            <Link color="inherit"
                                aria-label="menu"
                                component={RouterLink}
                                to="/clima">
                                Ingresar
                            </Link>
                        </Grid>
                    </Grid>
                </div>
            </Grid>
        </WelcomePageComponent>
    )
}

export default WelcomePage