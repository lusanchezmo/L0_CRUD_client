import { useState, useEffect } from 'react'

function CustomSelect(props) {


    return (
        <>
            <select onChange={(event) => props.handleInputChange(event, props.index)}/*value={selectedOption} onChange={handleSelectChange}*/>
                <option value="">-- Selecciona --</option>
                {props.item.getFields ? props.item.fieldsToSet.map((field, indexField) => (
                    <option key={indexField} value={props.item.funcionGetId ? props.item.funcionGetId(field) : props.item.funcionGetName(field)} >{props.item.funcionGetName(field)}</option>
                )) : ""}
            </select>
        </>
    )
}

export default CustomSelect