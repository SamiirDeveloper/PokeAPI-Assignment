// When the "Search" button is clicked, run the fetchPokemon() function
document.getElementById('search-button').addEventListener('click', fetchPokemon);

// Also run fetchPokemon() when the Enter key is pressed inside the input field
document.getElementById('pokemon-input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        fetchPokemon(); // Trigger search on Enter key press
    }
});


// This function fetches Pokémon data from the PokéAPI and displays it
async function fetchPokemon() {
    // Get the input field, the result display area, and the error message area
    const input = document.getElementById('pokemon-input');
    const pokemonInfo = document.getElementById('pokemon-info');
    const errorDiv = document.getElementById('error');

    // Clear any previous search results or error messages
    pokemonInfo.innerHTML = "";
    errorDiv.textContent = "";

    // Check if input is empty or only spaces
    if (!input || !input.value.trim()) {
        errorDiv.textContent = 'Please enter a Pokemon name or ID.';
        return; // Stop the function if no input was given
    }

    try {
        // Make a request to the PokéAPI using the user's input (converted to lowercase)
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${input.value.toLowerCase()}`);
        
        // If the response is not OK (404 or error), throw an error
        if (!response.ok) {
            throw new Error('Pokemon not found');
        }

        // Convert the API response to a JavaScript object
        const data = await response.json();

        // Capitalize the first letter of the Pokémon name
        const name = data.name.charAt(0).toUpperCase() + data.name.slice(1);

        // Get the default front image of the Pokémon
        const image = data.sprites.front_default;

        // Get all Pokémon types and join them into a single string (e.g., "fire, flying")
        const type = data.types.map(t => t.type.name).join(', ');

        // Display the Pokémon's name, image, and types in the page
        pokemonInfo.innerHTML = `
            <h2>${name}</h2>
            <img src="${image}" alt="${name}" />
            <p><strong>Type:</strong> ${type}</p>
        `;
    } catch (error) {
        // Show an error message if the Pokémon was not found or something went wrong
        errorDiv.textContent = 'Pokemon not found. Please try again.';
    }
}
