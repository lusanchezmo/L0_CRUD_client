function asyncCustomQuery(query) {

    if (query.method === 'POST') {
        console.log("p")
        fetch(query.URL, {
            method: query.method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(query.body),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la solicitud');
                }
                return response.json();
            })
            .then(data => {
                console.log(data); // Guardar la respuesta del servidor en el estado
                query.callBack(data, query.body)
                //setPersonas([...personas, persona]);
            })
            .catch(error => {
                console.error('Error al enviar los datos:', error);
                //toast.warn("Error Subiendo");
            });
    } else {
        console.log("g")
        if(query.body){
            console.error('consulta get no debe llevar body, para usar params use post');
        }
        fetch(query.URL)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                //console.log(data);
                //setMunicipios(data.data);
                query.callBack(data)
                // Aquí puedes hacer algo con los datos, como actualizar el estado de un componente en React
            })
            .catch(error => {
                console.error('Fetch error:', error);
                // Aquí puedes manejar errores, como mostrar un mensaje de error al usuario
            });
    }



}

export default asyncCustomQuery