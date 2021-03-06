import React, { useMemo, useState, useContext, useEffect } from 'react';
import Frame from '../../Frame/Frame'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';
import { IconContext } from 'react-icons'
import IconState from '../../Icons/Icons'
import {  SubmitButton, Loading, } from "../../index";
import { delegate } from '../../../delegate/delegate';
import { store, actions, currentState } from '../../../WeatherContext';


function MainCardForecast({onSubmit}) {

    const { state, dispatch } = useContext(store);
    const iconContextSize = useMemo(() => ({ size:'6em'}), [])
   
    const [currentTemp, setCurrentTemp] = useState([]);
    const [feelsLike, setFeelsLike] = useState([]);
    const [humidity, setHumidity] = useState([]);
    const [dataNextDays, setDataNextDays] = useState([]);
    const [weatherState, setWeatherState] = useState([]);
    const [city, setCity] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    
    //Trae resultados de One Call API y los asigna a states
    useEffect(() => {
        const lat = currentState.selectedCityLat.latitud;
        const lon = currentState.selectedCityLon.longitud;
    
    const paramsForecast = {
        "lat": lat,
        "lon": lon,
        "exclude": "minutely,alerts",
        "units":"metric",
        "appid": "a79966a6ea68d0d7625eff5a328cc0bb",
    }
       delegate.getForecast(paramsForecast).then(data => {
            
            let dataForecast = data;
            setCurrentTemp(dataForecast.current.temp);
            setFeelsLike(dataForecast.current.feels_like);
            setHumidity(dataForecast.current.humidity);
            setDataNextDays(dataForecast.daily);
            setWeatherState(dataForecast.current.weather[0].main)
            setCity(currentState.selectedCity.city)
            setIsLoading(false)

            dispatch({ type: actions.IS_LOADING, payload: false });
            
        }).catch(error => {
            dispatch({ type: actions.ALERT_ERROR, payload: error });
            
        });

    }, [dispatch]);
    
    //Envia info para resultado de pronostico extendido
    const handleSubmit = (e) => {

        const dataExtendedForecast = {
            data: dataNextDays
        }
        onSubmit(dataExtendedForecast);
    };

    return (
        <Frame>
            {isLoading &&
                <Loading />
            }
            {!isLoading &&
            <div className="main-wrap">
                <div className = "cardContainer">
                    <Grid 
                        // item container 
                        // xs={12} 
                        justifyContent="center"
                        alignItems="center"
                        
                        >
                            {
                                city &&
                                <Typography display="inline" variant="h3" >{city}</Typography>
                            }
                    </Grid>
                    <Grid container item 
                        // spacing={1}
                        justifyContent="center"
                        >
                        <Grid container item
                            // xs={12}
                            // direction="row"
                            justifyContent="center"
                            // alignItems="center"
                            >
                            <IconContext.Provider value={iconContextSize}>
                                {
                                    weatherState ?
                                    <IconState state={weatherState}/>
                                    :
                                    <Skeleton variant="circle" height={80} width={80}></Skeleton>
                                }
                            </IconContext.Provider>
                            {
                                currentTemp ? 
                                <Typography display="inline" variant="h2">{currentTemp}??</Typography>
                                :
                                <Skeleton variant="rect" height={80} width={80}></Skeleton>
                            }
                        </Grid>
                        <Grid item
                        container
                        margin= "5px"
                        justifyContent="center"
                        >
                        {
                            humidity ?
                            <Typography style={{ paddingRight: "25px", fontWeight:"bold"}} >Humedad:{humidity}%</Typography>
                            :
                            <Skeleton variant="rect" height={80} width={80}></Skeleton>
                        }
                        {
                            feelsLike ?
                            <Typography style={{ paddingleft: "25px", fontWeight:"bold"}}>Sensaci??n T??rmica:{feelsLike}??</Typography>
                            :
                            <Skeleton variant="rect" height={80} width={80}></Skeleton>

                        }
                        </Grid>
                        <Grid item
                            direction="column"
                            justify="center"
                            alignItems="center"
                            
                            
                        >
                            <SubmitButton
                                name= "Ver pr??ximos 7 d??as"
                                onClick={handleSubmit}
                            />
                        </Grid>
                    </Grid>
                    
                </div>
            </div>    
            }    
        </Frame> 
    );
}

export default MainCardForecast;
