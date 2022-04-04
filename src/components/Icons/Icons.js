import React from 'react'
import { WiDayCloudy,
    WiDaySunny,
    WiRain,
    WiSnow,
    WiRaindrop,
    WiThunderstorm } from 'react-icons/wi'
   

function Icons  ({ state }) {
    const stateByName = {
        clouds: WiDayCloudy,
        clear: WiDaySunny,
        rain: WiRain,
        snow: WiSnow, 
        drizzle: WiRaindrop,
        thunderstorm: WiThunderstorm
    }

    const StateByName = stateByName[state]
    
    return (
        <StateByName />
    )
}

// IconState.propTypes = {
//     state: PropTypes.oneOf(validValues).isRequired,
// }

export default Icons
