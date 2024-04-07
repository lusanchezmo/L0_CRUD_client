import { useState, useEffect } from 'react'
import CustomSelect from './CustomSelect'
import CustomInput from './CustomInput'

function TableInputs(props) {

    return (
        <>
            <table>
                <thead>
                    <tr>
                        {props.columnas ? props.columnas.map((item, index) => (
                            <th key={index}>{item.name}</th>
                        )) : ""}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {props.columnas ? props.columnas.map((item, index) => {
                            switch (item.tipe) {
                                case 'select':
                                    return <th key={index}>
                                        <CustomSelect item={item} index={index} handleInputChange={props.handleInputChange}></CustomSelect>
                                    </th>;

                                case 'text':
                                case 'number':
                                    return <th key={index}>
                                        <CustomInput item={item} index={index} handleInputChange={props.handleInputChange}></CustomInput>
                                    </th>;

                                default:
                                    return <h1 key={index}>{item.name}</h1>;
                            }


                        }) : ""}
                    </tr>
                </tbody>
            </table>
        </>
    )
}

export default TableInputs