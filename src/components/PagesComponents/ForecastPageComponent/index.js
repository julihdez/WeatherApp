import React from 'react';
import {MainCardForecast, Loading, GenericTable, } from "../../";
import { FaDownload } from "react-icons/fa";
// import ActionButton from '../../Form/Buttons/ActionButton';
import { delegate } from '../../../delegate/delegate';


// const headerCells = [
//   {
//     title: "Código/Rama",
//     hasCaret: false,
//     key: "rama"
//   },
//   {
//     title: "Nro. de Póliza",
//     hasCaret: false,
//     key: "numpolicy"
//   },
//   {
//     title: "Nro. de Contrato",
//     hasCaret: false,
//     key: "numcontrato"
//   },
//   {
//     title: "Tipo",
//     hasCaret: false,
//     key: "tipo"
//   },
//   {
//     title: "Producto",
//     hasCaret: true,
//     onClickSorting: () => console.log("Hola"),
//     key: "producto"
//   },
//   {
//     title: "Tomador",
//     hasCaret: true,
//     onClickSorting: () => console.log("Hola"),
//     key: "tomador"
//   },
//   {
//     title: "Fecha de Estado",
//     hasCaret: true,
//     onClickSorting: () => console.log("Hola"),
//     key: "emision"
//   },
//   {
//     title: "Estado",
//     hasCaret: false,
//     key: "estado"
//   },
// ]



function ForecastPageComponent({
}) {



//   const actions = [
//     {
//       name: "Ver detalles",
//       action: (selectedRow) => handleDetallesVC(selectedRow)
//     }
//   ];

  return (
    <div className="forecast-page-wrapper">
      <MainCardForecast
        // onSubmit={onSubmit}
        // openDetail={openDetail}
        // isLoading={isLoading}
      />
      {
    //   !isLoading && showTable && !openDetail && dataParaRows.length > 0 &&
        <div className="tabs-container">
          <div className="forecast-page-wrapper">
            <div className="standar-spliter"></div>
            {/* <div className="action-single-button-container" onClick={handleClickExcel}>
              <ActionButton
                action="Descargar Excel"
                icon={<FaDownload />}
              />
            </div> */}
            {/* <GenericTable
              rows={rows}
              headerCells={headerCells}
              hasActions
              actions={actions}
              tableMaxWidth={300}
              onPageChange={onPageChange}
            /> */}
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
