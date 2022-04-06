import React, { useMemo, useState, useContext, useEffect } from 'react';
import { delegate } from '../delegate/delegate';
import Frame from '../components/Frame/Frame'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';
import { IconContext } from 'react-icons'
import IconState  from '../components/Icons/Icons'
import {  ForecastPageComponent, SubmitButton } from "../components/index"
import { store, actions, currentState } from '../WeatherContext';
import moment from 'moment'
import 'moment/locale/es'

function createData(
    day,
    min,
    max,
    icon,
) {
    return {
    day,
    min,
    max,
    icon,
    };
}



function ForecastPage() {
const [rows, setRows] = useState([]);
const [currentPage, setCurrentPage] = useState(0);


const handleSearchSubmit = (e) => {
    const dataParaRows= e;
    let rows = [];

    dataParaRows.data.forEach((result) => {
    
        rows.push(createData(
            moment.unix(result.dt).format('dddd'),
            result.temp.min + "°",
            result.temp.max + "°",
            result.weather[0].main ,
        ));
    }
    )
    setRows(rows);

}


return (
    <div>
        <div className="search-card-wrapper">
            <>
                <ForecastPageComponent 
                    onSubmit={handleSearchSubmit}
                    rows={rows}
                />
            </>
        </div>
    </div>
);
}

export default ForecastPage;