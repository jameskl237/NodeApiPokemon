const express = require('express')
let pokemons = require('./mock-pokemon')
const {success, getUniqueId} = require('./helper.js')
const morgan = require('morgan')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')

const app = express()
const port = 3000

app
    .use(favicon(__dirname+ '/favicon.ico'))
    .use(morgan('dev'))
    .use(bodyParser.json())

app.get('/', (req,res) => res.send('hello, jame express'))

app.get ('/api/pokemon/:id', (req,res) => {
    const id = parseInt(req.params.id)
    const pokemon = pokemons.find(pokemon => pokemon.id === id)
    res.json(success('il existe',pokemon))
})

app.get('/api/pokemons', (req, res)=> {
    const message = 'voici tous nos pokemons'
    const names = pokemons.map(pokemon => pokemon.name)
    res.json(success(message, names))
})

app.post('/api/pokemons/add', (req, res)=> {
    const id = getUniqueId(pokemons);
    const pokemonCreated = { ...req.body, id: id, created: new Date() };
    pokemons.push(pokemonCreated);
    const message = 'Le Pokémon ' + pokemonCreated.name + ' a bien été créé'; // Ajout d'un espace
    res.json(success(message, pokemonCreated));
})

app.put('/api/pokemon/:id', (req,res) =>{
    const id = parseInt(req.params.id)
    const index = pokemons.findIndex(pokemon => pokemon.id = id)
    const pokemonUpdated = { ...req.body, id: id };
    // pokemons.map(pokemon => {
    const pokemon = pokemons[index]
     pokemons[index] =  pokemonUpdated
    // })
    const message = 'Le Pokémon ' + pokemon.name + ' a bien été modifie'; 
    res.json(success(message, pokemonUpdated));
})

app.delete('/api/pokemon/:id', (req,res) =>{
    const id = parseInt(req.params.id)
    const pokemonDeleted = pokemons.find(pokemon => pokemon.id = id)
    pokemons.filter(pokemon => pokemon.id != id)
    const message = 'Le Pokémon ' + pokemonDeleted.name + ' a bien été supprime'; 
    res.json(success(message, pokemonDeleted));
})

app.listen(port, () => console.log("notre application est demarre sur: http://localhost:"+port)) 