import React, { useMemo, useState, useContext, useEffect } from 'react';
import Frame from '../../Frame/Frame'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';
import { IconContext } from 'react-icons'
import IconState, { validValues } from '../../Icons/Icons'
import {  SubmitButton } from "../../index";
import { delegate } from '../../../delegate/delegate';
import { store, actions, currentState } from '../../../WeatherContext';
// import CancelButton from '../../Form/Buttons/CancelButton';

// const useStylesBootstrap = makeStyles((theme) => ({
//     arrow: {
//         color: theme.palette.common.black,
//     },
//     tooltip: {
//         backgroundColor: theme.palette.common.black,
//         fontSize: "12px"
//     },
// }));


function MainCardForecast({ onSubmit }) {

    const { state, dispatch } = useContext(store);
    const iconContextSize = useMemo(() => ({ size:'6em'}), [])
   
    const [currentTemp, setCurrentTemp] = useState([]);
    const [feelsLike, setFeelsLike] = useState([]);
    const [humidity, setHumidity] = useState([]);
    const [dataNextDays, setDataNextDays] = useState([]);
    const [weatherState, setWeatherState] = useState([]);
    const [city, setCity] = useState([]);
    // const [lat, setLat] = useState([]);
    // const [lon, setLon] = useState([]);
    
    //Trae resultados de One Call API y los asigna a states
    useEffect(() => {
        const lat = currentState.selectedCityLat.latitud;
        const lon = currentState.selectedCityLon.longitud;
        // const country = currentState.SelectedCity.country
    
    const paramsForecast = {
        "lat": lat,
        "lon": lon,
        "exclude": "minutely,alerts",
        "units":"metric",
        "appid": "a79966a6ea68d0d7625eff5a328cc0bb",
    }
       delegate.getForecast(paramsForecast).then(data => {
            console.log(data)
            let dataForecast = data;
            
            setCurrentTemp(dataForecast.current.temp);
            setFeelsLike(dataForecast.current.feels_like);
            setHumidity(dataForecast.current.humidity);
            setDataNextDays(dataForecast.daily);
            setWeatherState(dataForecast.current.weather[0].main)
            setCity("ejemp")

        }).catch(error => {
            dispatch({ type: actions.ALERT_ERROR, payload: error });
            
        });

    }, [dispatch]);

    console.log(currentTemp, feelsLike, weatherState)


    //Envia info para resultado de pronostico extendido
    const handleSubmit = (e) => {

        const dataExtendedForecast = {
            data: dataNextDays
        }

        e.preventDefault()
        onSubmit(dataExtendedForecast);
    };

    return (
        <Frame>
            <Grid container
                justify="space-around"
                direction="column"
                spacing={2}>
                <Grid item container 
                    xs={12} 
                    justify="center"
                    alignItems="flex-end">
                        {
                            city &&
                            <Typography display="inline" variant="h4">{city}, </Typography>
                        }
                </Grid>
                <Grid container item xs={12}
                    justify="center">
                    <Grid container item
                        direction="row"
                        justify="center"
                        alignItems="center"
                        spacing={1}>
                        <IconContext.Provider value={iconContextSize}>
                            {
                                weatherState ? 
                                <IconState state="clouds" />
                                :
                                <Skeleton variant="circle" height={80} width={80}></Skeleton>
                            }
                        </IconContext.Provider>
                        {
                            currentTemp ? 
                            <Typography display="inline" variant="h2">{currentTemp}</Typography>
                            :
                            <Skeleton variant="rect" height={80} width={80}></Skeleton>
                        }
                    </Grid>
                    {
                        humidity && feelsLike && 
                        <>
                            <Typography>Humedad: {humidity}%</Typography>
                            <Typography>Sensación Térmica: {feelsLike}°</Typography>
                        </>
                    }
                </Grid>
                <Grid item
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                >
                    <SubmitButton
                        name= "Ver próximos días"
                        onClick={handleSubmit}
                    />
                </Grid>
            </Grid>        
        </Frame> 
        // <div className="main-card-container">
        //     <div className="main-card-inner-wrap">
        //         <div className="form-row main-card-content-wrap">
        //         <div className="col-md-6">
        //                 <div className="main-forecast-card-align">
        //                     <SubmitButton
        //                         name="Próximos Días"
        //                         onClick={handleSubmit}
        //                     />
        //                     {/* <CancelButton
        //                         name="Limpiar"
        //                         onClick={handleLimpiar}
        //                     /> */}
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>
    )
}

export default MainCardForecast;
