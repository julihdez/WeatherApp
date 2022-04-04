import { serverCallGet } from '../helpers/service.call';

export const delegate = {

    //Llamado Geocoding
    getCoordenadas: (params) => {
        return serverCallGet('http://api.openweathermap.org/geo/1.0/direct', params);
    },

    //Llamado One Call API
    getForecast: (params) => {
        return serverCallGet('https://api.openweathermap.org/data/2.5/onecall', params);
    }
}