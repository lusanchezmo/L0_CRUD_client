import { useState, useEffect } from 'react'

function CustomInput(props) {

    return (
        <>
            <input
                type={props.item.tipe}
                //value={estadosArray[index][0]}
                onChange={(event) => props.handleInputChange(event, props.index)}
                placeholder={props.item.name}
            />
        </>
    )
}

export default CustomInput