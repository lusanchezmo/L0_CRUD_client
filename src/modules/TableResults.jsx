import { useState, useEffect } from 'react'

import RowListElements from './RowListElements'
import RowListNames from './RowListNames'

function TableResults(props) {


    return (
        <>
            <table className='table'>
                <thead >
                    <RowListNames columnas={props.columnas}></RowListNames>
                </thead>
                <tbody>
                    {props.elemsToRender.map((item, index) => (
                        <RowListElements modificable={props.modificable} key={index} index={index} columnas={props.columnas} item={item} eliminarElementFunction={props.eliminarElementFunction} getIdFromRow={props.getIdFromRow}></RowListElements>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default TableResults