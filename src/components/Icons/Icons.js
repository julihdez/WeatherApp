import React from 'react'
import { store, actions, currentState } from '../../WeatherContext';
import { WiDayCloudy,
    WiDaySunny,
    WiRain,
    WiSnow,
    WiRaindrop,
    WiThunderstorm } from 'react-icons/wi'
   
function Icons  ({state}) {

    const validValues = [
        "Clouds",
        "Clear",
        "Rain",
        "Snow",
        "Drizzle",
        "Thunderstorm"
    ]

    const stateByName = {
        Clouds: WiDayCloudy,
        Clear: WiDaySunny,
        Rain: WiRain,
        Snow: WiSnow, 
        Drizzle: WiRaindrop,
        Thunderstorm: WiThunderstorm
    }

    if(validValues.includes(state)){
        const StateByName = stateByName[state]
        return (
            <StateByName />
        )
    }else{
        const StateByName = stateByName.Clouds
        return (
            <StateByName />
        )
    }
    
}

export default Icons
