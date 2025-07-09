document.getElementById('search-button').addEventListener('click', fetchPokemon);

async function fetchPokemon() {
    const input = document.getElementById(pokemon-input);
    const pokemonInfo = document.getElementById(pokemon-info);
    const errorDiv = document.getElementById(error);

    pokemonInfo.innerHTML = "";
    errorDiv.textContent = "";

    if(!input) {
        errorDiv.textContent = 'Please enter a Pokemon name or ID.';
        return
    }``
    try {
        const response = await fetch(`https://pokeapi.co/${input}`);
        if(!response) {
            throw new errorDiv('Pokemon not found');
        }
        const data = await response.json();

        const name = data.name.charAt(0).toUpperCase() + data.name.slice(1);
        const image = data.sprites.front_default;
        const type = data.type.map(t => t.type.name).join(' ');

        pokemonInfo.innerHTML = `
        <h2>${name}</h>
        <img src="${image}" alt="${name}" />
        <p><strong>Type:</strong> ${type}</p>
        `;
    } catch(error) {
        errorDiv.textContent = 'Pokemon not found. Please try again.';
    }
}
