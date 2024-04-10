import { useState, useEffect } from 'react'

import './App.css'
import ListRender from './modules/ListRender'

import asyncCustomQuery from './helpers/asyncCustomQuery'

function App() {
  const [activeTab, setActiveTab] = useState('personas');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const [personas, setPersonas] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [viviendas, setViviendas] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);

  const verificacionNulosPersona = () => {
    return estadosArray.slice(0, -1).every(objeto => objeto[0] ? true : false);
  }

  const verificacionNulosVivienda = () => {
    return estadosArrayViviendas.slice(0, -1).every(objeto => objeto[0] ? true : false);
  }

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
    }, {
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
        return persona.PERSONA_ID
      }
    }
  ]
  const estadosArray = columnas.map(() => useState());


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
      name: `PERSONA_ID`,
      tipe: "number",
      getFields: false
    }
  ]
  const estadosArrayViviendas = columnasVivienda.map(() => useState());

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

  const insertPersonaCallback = (data, persona) => {
    setPersonas([...personas, persona])
  }

  const insertPersona = (persona) => {
    asyncCustomQuery({ method: 'POST', URL: 'http://localhost:3000/insertPersona', body: persona, callBack: insertPersonaCallback })
  }

  const insertViviendaCallback = (data, vivienda) => {
    setViviendas([...viviendas, vivienda])
  }

  const insertVivienda = (vivienda) => {
    asyncCustomQuery({ method: 'POST', URL: 'http://localhost:3000/insertVivienda', body: vivienda, callBack: insertViviendaCallback })
  }

  const fetchMunicipiosCallback = (data) => {
    setMunicipios(data.data);
  }

  const fetchMunicipios = () => {
    asyncCustomQuery({ method: 'GET', URL: "http://localhost:3000/getMunicipios", callBack: fetchMunicipiosCallback })
  }

  const fetchDepartamentosCallback = (data) => {
    setDepartamentos(data.data);
  }

  const fetchDepartamentos = () => {
    asyncCustomQuery({ method: 'GET', URL: "http://localhost:3000/getDepartamentos", callBack: fetchDepartamentosCallback })
  }

  const eliminarPersonaCallback = (data, personaD) => {
    setPersonas(personas.filter(persona => persona.PERSONA_ID !== personaD.PERSONA_ID));
  }

  const eliminarPersona = (PERSONA_ID) => {
    asyncCustomQuery({ method: 'POST', URL: 'http://localhost:3000/deletePersona', body: { PERSONA_ID: PERSONA_ID }, callBack: eliminarPersonaCallback })
    console.log(PERSONA_ID)
  }
  
  const eliminarViviendaCallback = (data, viviendaD) => {
    setViviendas(viviendas.filter(vivienda => vivienda.VIVIENDA_ID !== viviendaD.VIVIENDA_ID));
  }

  const eliminarvivienda = (vivienda_ID) => {
    asyncCustomQuery({ method: 'POST', URL: 'http://localhost:3000/deleteVivienda', body: { VIVIENDA_ID: vivienda_ID }, callBack: eliminarViviendaCallback })
    console.log(vivienda_ID)
  }

  const fetchPersonasCallBack = (data) => {
    setPersonas(data.data);
  }

  const fetchPersonas = () => {
    asyncCustomQuery({ method: 'GET', URL: "http://localhost:3000/getPersonas", callBack: fetchPersonasCallBack })
  }

  const editarPersona = (PERSONA_ID,values) => {
    console.log(PERSONA_ID)
  }
  const editarViviendas = (PERSONA_ID,values) => {
  }
  const fetchViviendasCallback = (data) => {
    setViviendas(data.data);
  }
  const fetchViviendas = () => {
    asyncCustomQuery({ method: 'GET', URL: "http://localhost:3000/getViviendas", callBack: fetchViviendasCallback })
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
    console.log(estadosArray)
    console.log(verificacionNulosPersona())
    if (verificacionNulosPersona()) {
      //console.log(createPersona())
      let persona = createPersona()

      //setInputValueNombrePersonas('');
      insertPersona(persona)
      console.log("personas")
      console.log(personas)
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
    console.log(estadosArrayViviendas)
    console.log(verificacionNulosVivienda())
    if (verificacionNulosVivienda()) {
      //console.log(createPersona())
      let vivienda = createVivienda()

      //setInputValueNombreviviendas('');
      insertVivienda(vivienda)
      console.log("viviendas")
      console.log(viviendas)
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
    </>
  )
}

export default App
