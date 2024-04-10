import { useState, useEffect } from 'react'

function RowListElements(props) {


    return (
        <>

            <tr key={props.index}>
                <td>{props.index + 1}</td>
                {props.columnas ? props.columnas.map((itemC, indexP) => (
                    <td key={indexP}>{props.item[itemC.name]}</td>
                )) : ""}
                {props.modificable ?
                    (<>
                        <td><button className='agregar' >Editar</button></td>
                        <td><button className='agregar' onClick={() => props.eliminarElementFunction(props.getIdFromRow(props.item))}>Eliminar</button></td>
                    </>) : ("")}

            </tr>
        </>
    )
}

export default RowListElements