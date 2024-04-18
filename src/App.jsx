import { useState, useEffect } from 'react'

import './App.css'
import ListRender from './modules/ListRender'

import asyncCustomQuery from './helpers/asyncCustomQuery'
const apiUrl = import.meta.env.VITE_REACT_APP_API_BASE_URL;

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [activeTab, setActiveTab] = useState('personas');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const [personas, setPersonas] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [viviendas, setViviendas] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  
  useEffect(()=>{
    console.log(personas);
  })
  
  const columnas = [
    {
      name: `MUNICIPIO_ID`,
      tipe: 'select',
      getFields: true,
      fieldsToSet: municipios,
      funcionGetName: (municipio) => {
        return (municipio.MUNICIPIO_ID + " " + municipio.MUNICIPIO_NOMBRE)
      },
      funcionGetId: (municipio) => {
        return municipio.MUNICIPIO_ID
      }
    }, {
      name: `VIVIENDA_ID`,
      tipe: 'select',
      getFields: true,
      fieldsToSet: viviendas,
      funcionGetName: (vivienda) => {
        return (vivienda.VIVIENDA_ID + " " + vivienda.VIVIENDA_DIRECCION)
      },
      funcionGetId: (vivienda) => {
        return vivienda.VIVIENDA_ID
      }
    },
    {
      name: `PERSONA_NOMBRE`,
      tipe: "text",
      getFields: false
    }, {
      name: `PERSONA_APELLIDO`,
      tipe: "text",
      getFields: false
    }, {
      name: `PERSONA_SEXO`,
      tipe: 'select',
      getFields: true,
      fieldsToSet: ['Masculino', 'Femenino'],
      funcionGetName: (elem) => { return elem },
      funcionGetId: (elem) => { return (elem == 'masculino' ? 0 : 1) }
    }, {
      name: `PERSONA_EDAD`,
      tipe: "number",
      getFields: false
    }, {
      name: `PERSONA_TELEFONO`,
      tipe: "number",
      getFields: false
    }, {
      name: `PERSONA_RESPONSABLE`,
      tipe: 'select',
      getFields: true,
      fieldsToSet: personas,
      funcionGetName: (persona) => {
        return (persona.PERSONA_ID + " " + persona.PERSONA_NOMBRE)
      },
      funcionGetId: (persona) => {
        return persona.PERSONA_NOMBRE
      }
    },
    {
      name: 'PERSONA_ID',
      tipe: 'number',
      getFields: false
    }
  ]
  
  const estadosArray = columnas.map(() => useState(''));

  const columnasVivienda = [
    {
      name: `MUNICIPIO_ID`,
      tipe: 'select',
      getFields: true,
      fieldsToSet: municipios,
      funcionGetName: (municipio) => {
        return (municipio.MUNICIPIO_ID + " " + municipio.MUNICIPIO_NOMBRE)
      },
      funcionGetId: (municipio) => {
        return municipio.MUNICIPIO_ID
      }
    }, {
      name: `VIVIENDA_DIRECCION`,
      tipe: "text",
      getFields: false
    }, {
      name: `VIVIENDA_CAPACIDAD`,
      tipe: "number",
      getFields: false
    }, {
      name: `VIVIENDA_NIVELES`,
      tipe: "number",
      getFields: false
    }, {
      name: `PERSON_ID`,
      tipe: "number",
      getFields: false
    }
  ]
  const estadosArrayViviendas = columnasVivienda.map(() => useState(''));

  const columnasMunicipio = [
    {
      name: `DEPARTAMENTO_ID`,
      tipe: "number",
      getFields: false
    }, {
      name: `MUNICIPIO_ID`,
      tipe: "number",
      getFields: false
    }, {
      name: `MUNICIPIO_NOMBRE`,
      tipe: "text",
      getFields: false
    }, {
      name: `MUNICIPIO_AREA`,
      tipe: "number",
      getFields: false
    }, {
      name: `MUNICIPIO_PRESUPUESTO`,
      tipe: "number",
      getFields: false
    }
  ]

  const columnasDepartamento = [
    {
      name: `DEPARTAMENTO_ID`,
      tipe: "number",
      getFields: false
    }, {
      name: `DEPARTAMENTO_NOMBRE`,
      tipe: "text",
      getFields: false
    }
  ]
  
  const reload = () => {
    window.location.reload();
  }

  const insertPersonaCallback = (data, persona) => {
    setPersonas([...personas, persona])
  }

  const insertPersona = (persona) => {
    console.log(persona);
    asyncCustomQuery({ method: 'POST', URL: `${apiUrl}/insertPersona`, body: persona, callBack: insertPersonaCallback })
  }

  const insertViviendaCallback = (data, vivienda) => {
    setViviendas([...viviendas, vivienda])
  }

  const insertVivienda = (vivienda) => {
    asyncCustomQuery({ method: 'POST', URL: `${apiUrl}/insertVivienda`, body: vivienda, callBack: insertViviendaCallback })
  }

  const fetchMunicipiosCallback = (data) => {
    setMunicipios(data.data);
  }

  const fetchMunicipios = () => {
    asyncCustomQuery({ method: 'GET', URL: `${apiUrl}/getMunicipios`, callBack: fetchMunicipiosCallback })
  }

  const fetchDepartamentosCallback = (data) => {
    setDepartamentos(data.data);
  }

  const fetchDepartamentos = () => {
    asyncCustomQuery({ method: 'GET', URL: `${apiUrl}/getDepartamentos`, callBack: fetchDepartamentosCallback })
  }

  const eliminarPersonaCallback = (data, personaD) => {
    setPersonas(personas.filter(persona => persona.PERSONA_ID !== personaD.PERSONA_ID));
  }

  const eliminarPersona = (PERSONA_ID) => {
    asyncCustomQuery({ method: 'POST', URL: `${apiUrl}/deletePersona` , body: { PERSONA_ID: PERSONA_ID }, callBack: eliminarPersonaCallback })
    console.log(PERSONA_ID)
  }
  
  const eliminarViviendaCallback = (data, viviendaD) => {
    setViviendas(viviendas.filter(vivienda => vivienda.VIVIENDA_ID !== viviendaD.VIVIENDA_ID));
  }

  const eliminarvivienda = (vivienda_ID) => {
    asyncCustomQuery({ method: 'POST', URL: `${apiUrl}/deleteVivienda`, body: { VIVIENDA_ID: vivienda_ID }, callBack: eliminarViviendaCallback })
    console.log(vivienda_ID)
  }

  const fetchPersonasCallBack = (data) => {
    setPersonas(data.data);
  }

  const fetchPersonas = () => {
    asyncCustomQuery({ method: 'GET', URL: `${apiUrl}/getPersonas`, callBack: fetchPersonasCallBack })
  }

  const editViviendaCallback = (data, VALUES) => {
    const updatedViviendas = viviendas.map(vivienda => {
      if (vivienda.VIVIENDA_ID === VALUES.VIVIENDA_ID) {
        return { ...vivienda, ...VALUES.VALUES };
      }
      return vivienda;
    });
  
    setViviendas(updatedViviendas);
  }

  const editPersonaCallback = (data, VALUES) => {
    const updatedPersonas = personas.map(persona => {
      if (persona.PERSONA_ID === VALUES.PERSONA_ID) {
        return { ...persona, ...VALUES.VALUES };
      }
      return persona;
    });
  
    setPersonas(updatedPersonas);
    console.log(VALUES);
  }

  const editarPersona = (PERSONA_ID, VALUES) => {
    asyncCustomQuery({ method: 'POST', URL: `${apiUrl}/editPersona`, body: { PERSONA_ID: PERSONA_ID, VALUES: VALUES }, callBack: editPersonaCallback })
  }
  const editarViviendas = (VIVIENDA_ID, VALUES) => {
    asyncCustomQuery({ method: 'POST', URL: `${apiUrl}/editVivienda`, body: { VIVIENDA_ID: VIVIENDA_ID, VALUES: VALUES }, callBack: editViviendaCallback })
  }

  const fetchViviendasCallback = (data) => {
    setViviendas(data.data);
  }
  const fetchViviendas = () => {
    asyncCustomQuery({ method: 'GET', URL: `${apiUrl}/getViviendas`, callBack: fetchViviendasCallback })
  }

  const handleInputChange = (e, index) => {
    //setInputValueNombrePersonas(e.target.value);
    estadosArray[index][1](e.target.value)
    console.log(index)
  };

  const handleInputChangeViviendas = (e, index) => {
    //setInputValueNombrePersonas(e.target.value);
    estadosArrayViviendas[index][1](e.target.value)
    console.log(index)
  };

  const createPersona = () => {
    let persona = {}
    columnas.forEach((columna, index) => {
      persona[columna.name] = estadosArray[index][0];
    });
    return persona
  }

  const getIdFromPersona = (persona) => {
    return persona.PERSONA_ID
  }

  const getIdFromVivienda = (vivienda) => {
    return vivienda.VIVIENDA_ID
  }

  const handleAddpersonas = () => {
    console.log(estadosArray);
      const personaNombreIndex = columnas.findIndex(columna => columna.name === 'PERSONA_NOMBRE');
      const personaApellidoIndex = columnas.findIndex(columna => columna.name === 'PERSONA_APELLIDO');
      const personaEdadIndex = columnas.findIndex(columna => columna.name === 'PERSONA_EDAD');
      const personaTelefonoIndex = columnas.findIndex(columna => columna.name === 'PERSONA_TELEFONO');
      const personaViviendaIndex = columnas.findIndex(columna => columna.name === `VIVIENDA_ID`);
      const personaMunicipioIndex = columnas.findIndex(columna => columna.name === 'MUNICIPIO_ID');
      const personaSexoIndex = columnas.findIndex(columna => columna.name === 'PERSONA_SEXO');


      const personaNombreValue = estadosArray[personaNombreIndex][0];
      const personaApellidoValue = estadosArray[personaApellidoIndex][0];
      const personaEdadValue = estadosArray[personaEdadIndex][0];
      const personaTelefonoValue = estadosArray[personaTelefonoIndex][0];
      const personaViviendaValue = estadosArray[personaViviendaIndex][0];
      const personaMunicipioValue = estadosArray[personaMunicipioIndex][0];
      const personaSexoValue = estadosArray[personaSexoIndex][0];

      const nombreValido = /^[A-Za-z\s]+$/.test(personaNombreValue);
      const apellidoValido = /^[A-Za-z\s]+$/.test(personaApellidoValue);
      const edadValida = personaEdadValue >= 0 && personaEdadValue <= 150; // Verifica que la edad esté en el rango válido (0 a 150)
      const telefonoValido = /^\d{10}$/.test(personaTelefonoValue); // Verifica que el teléfono tenga exactamente 10 dígitos
      const viviendaSeleccionado = personaViviendaValue !== "";
      const municipioSeleccionado = personaMunicipioValue !== '';
      const sexoSeleccionado = personaSexoValue !== '';

      if (nombreValido && apellidoValido && edadValida && telefonoValido && viviendaSeleccionado && municipioSeleccionado && sexoSeleccionado) {
        let persona = createPersona();
        insertPersona(persona);
        console.log("personas", personas);
      } else {
        if (!nombreValido || !apellidoValido) {
          toast.error("El nombre o apellido de la persona contiene caracteres no válidos");
        }
        if (!edadValida) {
          toast.error("La edad de la persona debe estar entre 0 y 150 años");
        }
        if (!telefonoValido) {
          toast.error("El teléfono de la persona debe tener exactamente 10 dígitos");
        }
        if (!viviendaSeleccionado || !municipioSeleccionado || !sexoSeleccionado ) {
          toast.error("Faltan campos por llenar");
        }
      }
  };
  

  const createVivienda = () => {
    let vivienda = {}
    columnasVivienda.forEach((columna, index) => {
      vivienda[columna.name] = estadosArrayViviendas[index][0];
    });
    return vivienda

  }

  const handleAddViviendas = () => {
    console.log(estadosArrayViviendas);
      const viviendaDireccionIndex = columnasVivienda.findIndex(columna => columna.name === 'VIVIENDA_DIRECCION');
      const viviendaCapacidadIndex = columnasVivienda.findIndex(columna => columna.name === 'VIVIENDA_CAPACIDAD');
      const viviendaNivelesIndex = columnasVivienda.findIndex(columna => columna.name === 'VIVIENDA_NIVELES');
      const personaIdIndex = columnasVivienda.findIndex(columna => columna.name === 'PERSON_ID');
      const municipioIdIndex = columnasVivienda.findIndex(columna => columna.name === 'MUNICIPIO_ID');

      const viviendaDireccionValue = estadosArrayViviendas[viviendaDireccionIndex][0];
      const viviendaCapacidadValue = estadosArrayViviendas[viviendaCapacidadIndex][0];
      const viviendaNivelesValue = estadosArrayViviendas[viviendaNivelesIndex][0];
      const personaIdValue = estadosArrayViviendas[personaIdIndex][0];
      const municipioIdValue = estadosArrayViviendas[municipioIdIndex][0];

      const direccionValida = viviendaDireccionValue !== ''; // Verifica que la dirección no esté vacía
      const capacidadValida = viviendaCapacidadValue > 0; // Verifica que la capacidad no sea negativa
      const nivelesValidos = viviendaNivelesValue > 0; // Verifica que el número de niveles no sea negativo
      const personaIdValido = /^\d+$/.test(personaIdValue); // Verifica que el ID de la persona tenga solo dígitos
      const municipioValida = municipioIdValue !== ''; // Verifica que el municipio no esté vacía

      if (direccionValida && capacidadValida && nivelesValidos && personaIdValido && municipioValida) {
        let vivienda = createVivienda();
        insertVivienda(vivienda);
      } else {
        if (!direccionValida) {
          toast.error("La dirección de la vivienda no puede estar vacía");
        }
        if (!capacidadValida) {
          toast.error("La capacidad de la vivienda no puede ser negativa o 0");
        }
        if (!nivelesValidos) {
          toast.error("El número de niveles de la vivienda no puede ser negativo o 0");
        }
        if (!personaIdValido) {
          toast.error("El ID de la persona debe contener solo dígitos");
        }
        if (!municipioValida) {
          toast.error("El ID del municipio no puede estar vacío");
        }
      }
    
  };

  useEffect(() => {
    fetchMunicipios();
    fetchViviendas();
    fetchPersonas();
    fetchDepartamentos();
  }, []);

  return (
    <>
    <div className='contenedor'>
      <div className="tabs">
        <button
          className={activeTab === 'personas' ? 'active' : 'tab'}
          onClick={() => handleTabClick('personas')}
        >
          Personas
        </button>
        <button
          className={activeTab === 'viviendas' ? 'active' : 'tab'}
          onClick={() => handleTabClick('viviendas')}
        >
          Viviendas
        </button>
        <button
          className={activeTab === 'departamentos' ? 'active' : 'tab'}
          onClick={() => handleTabClick('departamentos')}
        >
          Departamentos
        </button>
        <button
          className={activeTab === 'municipios' ? 'active' : 'tab'}
          onClick={() => handleTabClick('municipios')}
        >
          Municipios
        </button>
      </div>
      {activeTab === 'personas' && 
        <ListRender nombre={"Personas"}
          columnas={columnas} handleInputChange={handleInputChange}
          handleAddElements={handleAddpersonas} elemsToRender={personas}
          eliminarElementFunction={eliminarPersona} getIdFromRow={getIdFromPersona}
          editarElementFunction={editarPersona}
          modificable={true}></ListRender>
      }
      {activeTab === 'viviendas' && 
        <ListRender nombre={"Viviendas"}
          columnas={columnasVivienda} handleInputChange={handleInputChangeViviendas}
          handleAddElements={handleAddViviendas} elemsToRender={viviendas}
          eliminarElementFunction={eliminarvivienda} getIdFromRow={getIdFromVivienda}
          editarElementFunction={editarViviendas}
          modificable={true}></ListRender>
      }
      {activeTab === 'departamentos' &&
        <ListRender nombre={"Departamentos"}
          columnas={columnasDepartamento}
          elemsToRender={departamentos}
          modificable={false}></ListRender>
      }
      {activeTab === 'municipios' && 
        <ListRender nombre={"Municipios"}
          columnas={columnasMunicipio}
          elemsToRender={municipios}
          modificable={false}></ListRender>
      }
    </div>
    <ToastContainer 
        position="top-right" 
        autoClose={4000}
        closeOnClick/>
    </>
  )
}



export default App
