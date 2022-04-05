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
const [isLoading, setIsLoading] = useState(false);
const [showTable, setShowTable] = useState(false);
const [rows, setRows] = useState([]);
const [currentPage, setCurrentPage] = useState(0);
const [totalResultados, setTotalResultados] = useState();

const handleSearchSubmit = (e) => {
    console.log(e)
    setTotalResultados(e.total);
    const dataParaRows= e;
    let rows = [];

    dataParaRows.data.forEach((result) => {
        rows.push(createData(
            result.dt,
            result.temp.min,
            result.temp.max,
            result.weather.main,
        ));
    }
    )

        setRows(dataParaRows);
        setShowTable(true)
        setCurrentPage(0);
        setIsLoading(false);
    

}

React.useEffect(() => {
    setShowTable(true);
}, [
    currentPage
])
const handleSearchPaginado = (newPage) => {

    console.log("paginado")
}

const handleLoading = (state) => {
    setIsLoading(state)
}

return (
    <div>
        <div className="search-card-wrapper">
            <>
                <ForecastPageComponent 
                    onSubmit={handleSearchSubmit}
                    rows={rows}
                    // handleLoading={handleLoading}
                    // isLoading={isLoading}
                    showTable={showTable}
                    totalResultados={totalResultados}
                    onPageChange={handleSearchPaginado}
                />
            </>
        </div>
    </div>
);
}

export default ForecastPage;