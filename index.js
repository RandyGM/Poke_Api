const express = require('express');
//Importar Modulo Path
const path = require('path');

const app = express();

const port = 3000;

// Analizados JSON
app.use(express.json());

// Creacion de Rutas
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Función para llamar Poke_Api por ID o Nombre
async function getPokemon(NameOrID) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${NameOrID}`);
    const pokemon = await response.json();
    return pokemon;
}

async function getGeneration(generationNumber) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/generation/${generationNumber}/`);
        if (!response.ok) {
            throw new Error('Error al obtener la generación');
        }
        const generationData = await response.json();
        return generationData;
    } catch (error) {
        console.error(error);
        throw error; // Lanza el error para que el cliente lo capture
    }
}


// Ruta de API para obtener datos de un Pokémon por nombre o ID
app.get('/api/pokemon/:NameOrID', async (req, res) => {
    try {
        const NameOrID = req.params.NameOrID;
        const pokemon = await getPokemon(NameOrID);
        res.json(pokemon);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener datos de Pokémon" });
    }
});

// Ruta de API para obtener datos de Pokémon por generación
app.get('/api/generation/:generationNumber', async (req, res) => {
    try {
        const generationNumber = req.params.generationNumber;
        const generationData = await getGeneration(generationNumber);
        res.json(generationData);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener datos de la generación" });
    }
});

app.listen(port, () => {
    console.log(`Server running http://localhost:${port}`);
});