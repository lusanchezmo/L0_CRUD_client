import { useState, useEffect } from 'react'
import TableResults from './TableResults'
import TableInputs from './TableInputs'

function ListRender(props) {

  return (
    <>
      <div>
        <h2>{props.nombre}</h2>
        {props.modificable ? (
          <>
            <TableInputs columnas={props.columnas} handleInputChange={props.handleInputChange}></TableInputs>

            <button onClick={props.handleAddElements}>Agregar</button>
          </>
        ) : ("")}

        <TableResults modificable={props.modificable} elemsToRender={props.elemsToRender} columnas={props.columnas} eliminarElementFunction={props.eliminarElementFunction} getIdFromRow={props.getIdFromRow}></TableResults>
      </div>
    </>
  )
}

export default ListRender