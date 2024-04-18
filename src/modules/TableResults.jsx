import { useState, useEffect } from 'react'

import RowListElements from './RowListElements'
import RowListNames from './RowListNames'

function TableResults(props) {

    // console.log(props.elemsToRender)
    return (
        <>
            <table className='table'>
                <thead >
                    <RowListNames columnas={props.columnas}></RowListNames>
                </thead>
                <tbody>
                    {props.elemsToRender.map((item, index) => (
                        <RowListElements modificable={props.modificable} key={index} index={index} columnas={props.columnas} item={item} eliminarElementFunction={props.eliminarElementFunction}  editarElementFunction={props.editarElementFunction} getIdFromRow={props.getIdFromRow} desplazados={props.desplazados}></RowListElements>
                    ))}
                </tbody>
            </table>
        </>
    )

}

export default TableResults