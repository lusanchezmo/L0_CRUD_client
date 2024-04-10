import { useState, useEffect } from 'react'
import TableResults from './TableResults'
import TableInputs from './TableInputs'

function ListRender(props) {

  return (
    <>
      <div className='contenedorCrud'>
        <h2>{props.nombre}</h2>
        {props.modificable ? (
          <>
            <TableInputs columnas={props.columnas} handleInputChange={props.handleInputChange}></TableInputs>

            <button className='agregar' style={{marginTop:'5px'}} onClick={props.handleAddElements}>Agregar</button>
          </>
        ) : ("")}

        <TableResults modificable={props.modificable} elemsToRender={props.elemsToRender} columnas={props.columnas} eliminarElementFunction={props.eliminarElementFunction} editarElementFunction={props.editarElementFunction} getIdFromRow={props.getIdFromRow}></TableResults>
      </div>
    </>
  )
}

export default ListRender