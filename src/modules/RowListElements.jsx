import { useState, useEffect } from 'react'
import CustomSelect from './CustomSelect'
function RowListElements(props) {
    const [editing, setEditing] = useState(false);
    const [values, setValues] = useState(props.item);

    const handleInputChange = (e, name) => {
        const updatedValues = { ...values, [name]: e.target.value };
        setValues(updatedValues);
    };

    const handleEditClick = () => {
        setEditing(true);
    };

    const handleSaveClick = () => {
        setEditing(false);
        props.editarElementFunction(props.getIdFromRow(props.item), values)
    };
    return (
        <>

            <tr key={props.index}>
                <td>{props.index + 1}</td>
                {props.columnas ? props.columnas.map((itemC, indexP) => (
                    
                    <td key={indexP}>
                        {editing && (props.desplazados ? itemC.name === 'MUNICIPIO_DESPLAZAMIENTO' : true) ? (
                            props.desplazados ? (
                                <select onChange={(e) => handleInputChange(e, itemC.name)}/*value={selectedOption} onChange={handleSelectChange}*/>
                                    <option value="">-- Selecciona --</option>
                                    {itemC.getFields ? itemC.fieldsToSet?.map((field, indexField) => (
                                        <option key={indexField} value={itemC.funcionGetId ? itemC.funcionGetId(field) :itemC.funcionGetName(field)} >{itemC.funcionGetName(field)}</option>
                                    )) : ""}
                                </select>
                            ) : (
                                <input
                                    type="text"
                                    value={values[itemC.name]}
                                    onChange={(e) => handleInputChange(e, itemC.name)}
                                    style={{width:'50%'}}
                                />
                            )
                        ) : (
                            props.item[itemC.name]
                        )}
                    </td>
                )) : ""}
                {props.modificable && (
                    <>
                        {editing ? (
                            <td colSpan="2">
                                <button className='agregar' onClick={handleSaveClick}>Guardar</button>
                            </td>
                        ) : (
                            <>
                                <td><button className='agregar' onClick={handleEditClick}>Editar</button></td>
                                <td><button className='agregar' onClick={() => props.eliminarElementFunction(props.getIdFromRow(props.item))}>Eliminar</button></td>
                            </>
                        )}
                    </>
                )}
            </tr>
        </>
    )
}

export default RowListElements