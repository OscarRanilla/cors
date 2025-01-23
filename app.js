//! INICIAMOS PRIMERO NUESTRO SERVIDOR EN EL BACK-END

const axios = require('axios');
const express = require('express');
const cors = require('cors'); // con esta dependencia permitimos que  
// cualquier pagina que acceda a nuestro servidor pueda obtener esa información
const app = express();
const PORT = 3000;

app.use(cors()); //aqui hacemos que todas nuestras rutas pasen primero por ese 
//cors y permita esa entrada 

// CREAMOS LA RUTA PARA OBTENER TODOS LOS PERSONAJES DE LA API RICK AND MORTY

app.get('/characters', async (req, res) => {
    const characters = req.params.characters
    const url = 'https://rickandmortyapi.com/api/character/';

    try {
        const response = await axios.get(url);
        res.json(response.data);
    }   catch (error){
        res.status(404).json({error: 'No se pudieron obtener los personajes' });

    }

});

// CREAMOS LA RUTA PARA OBTENER UN PERSONAJE POR NOMBRE DE LA API RICK AND MORTY

app.get('/characters/:name', async (req, res) => {
    const characterName = req.params.name.toLowerCase();
    const url = `https://rickandmortyapi.com/api/character/?name=${characterName}`;

    try {
        const response = await axios.get(url);
        if (response.data.results && response.data.results.length > 0) {
            const character = response.data.results[0];
            const { name, status, species, gender, origin, image } = character;
            res.json({ name, status, species, gender, origin: origin.name, image });
        } else {
            res.status(404).json({ error: 'Personaje no encontrado' });
        }
    }  catch (error){
        res.status(404).json({error: 'Personaje no encontrado' });

    }

});

//!escuchamos al servidor con el puerto especificado

app.listen(PORT, () => {
    console.log(`listening server on port http://localhost:${PORT}`);
});

