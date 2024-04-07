import { useState, useEffect } from 'react'

function RowListNames(props) {


    return (
        <>
            <tr>
                <th>#</th>
                {props.columnas ? props.columnas.map((item, index) => (
                    <th key={index}>{item.name}</th>
                )) : ""}
            </tr>
        </>
    )
}

export default RowListNames