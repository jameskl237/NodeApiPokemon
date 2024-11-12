exports.success = (message, data) => {
    return {message, data}
}

exports.getUniqueId = (pokemons) => {
    const pokemonIDs = pokemons.map(pokemon => pokemon.id)
    const maxId = pokemonIDs.reduce((a,b) => Math.max(a,b))
    const uniqueId = maxId +1
     
    return uniqueId
}