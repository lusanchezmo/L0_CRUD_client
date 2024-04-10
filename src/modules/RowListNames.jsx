import { useState, useEffect } from 'react'

function RowListNames(props) {


    return (
        <>
            <tr>
                <th className='colums'>#</th>
                {props.columnas ? props.columnas.map((item, index) => (
                    <th  className='colums' key={index}>{item.name}</th>
                )) : ""}
            </tr>
        </>
    )
}

export default RowListNames