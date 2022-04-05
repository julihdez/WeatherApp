import React, {useState, useEffect} from 'react';
import {MainCardForecast, Loading, GenericTable, } from "../../";
import { FaDownload } from "react-icons/fa";
// import ActionButton from '../../Form/Buttons/ActionButton';
import moment from 'moment'
import 'moment/locale/es'


const headerCells = [
  {
    title: "Día",
    hasCaret: false,
    key: "day"
  },
  {
    title: "Mínima",
    hasCaret: false,
    key: "min"
  },
  {
    title: "Máxima",
    hasCaret: false,
    key: "max"
  },
  {
    title: "",
    hasCaret: false,
    key: "icon"
  },
]

const fakeData = [{day:"dom",min: 12,max: 10,icon:"rain"}, {day:"dom",min: 12,max: 10,icon:"rain"},{day:"dom",min: 12,max: 10,icon:"rain"},{day:"dom",min: 12,max: 10,icon:"S"}]

// weekDay: moment.unix(item.dt).format('dddd'),

function ForecastPageComponent({
  onSubmit,
  rows,
  currentPage,
  onPageChange,
  
  totalResultados
}) {
 
  const [dataParaRows, setDataParaRows] = useState([]);
  const [showTable, setShowTable] = useState(false);

  useEffect(() => {
    // if(rows.data && rows.data.length > 0){
    //   setDataParaRows(rows.data)
    //   setShowTable(true)
    // }
    setDataParaRows(fakeData)
    setShowTable(true)
}, [
    rows
])
  console.log(dataParaRows)
  

//   const actions = [
//     {
//       name: "Ver detalles",
//       action: (selectedRow) => handleDetallesVC(selectedRow)
//     }
//   ];

  return (
    <div className="forecast-page-wrapper">
      <MainCardForecast
        onSubmit={onSubmit}
        // isLoading={isLoading}
      />
      {
         showTable &&
        <div className="tabs-container">
          <div className="forecast-page-wrapper">
            <div className="standar-spliter"></div>
            <GenericTable
              rows={dataParaRows}
              headerCells={headerCells}
              tableMaxWidth={300}
              totalResultados={totalResultados}
              currentPage={currentPage}
              onPageChange={onPageChange}
            />
          </div>
        </div>
        
      }
      {/* {!isLoading && !openDetail && showTable && dataParaRows.length === 0 && alertaSinResultados &&
        <p>No se encontraron resultados</p>
      } */}
      {/* {isLoading &&
        <Loading />
      } */}
    </div>
  )
}

export default ForecastPageComponent
