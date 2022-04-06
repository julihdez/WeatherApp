import React, {useState, useEffect} from 'react';
import {MainCardForecast, Loading, GenericTable, } from "../../";
import { FaDownload } from "react-icons/fa";
import { store, actions, currentState } from '../../../WeatherContext';



const headerCells = [
  {
    title: "Día",
    hasCaret: false,
    key: "day",
    isDay: true
  },
  {
    title: "Mínima",
    hasCaret: false,
    key: "min",
    isTemp: true
  },
  {
    title: "Máxima",
    hasCaret: false,
    key: "max",
    isTemp: true
  },
  {
    title: "",
    hasCaret: false,
    key: "icon",
    isIcon: true
  },
]

function ForecastPageComponent({
  onSubmit,
  rows
}) {
 
  const [dataParaRows, setDataParaRows] = useState([]);
  const isLoading = currentState.isLoading.isLoading

  //recibe por props la info para poblar la tabla y la setea en un state 
  useEffect(() => {
    if(rows){
      setDataParaRows(rows)
    }
}, [
    rows
])


  return (
    <div className="forecast-page-wrapper">
      <MainCardForecast
        onSubmit={onSubmit}
      />
        <div className="forecast-table-wrapper">
        {
          !isLoading && 
            
                <GenericTable
                  rows={dataParaRows}
                  headerCells={headerCells}
                  tableMaxWidth={300}
                />
            
        }
        </div>
    </div>
    
  )
}

export default ForecastPageComponent
