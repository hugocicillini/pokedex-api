const pokemonList = document.getElementById("pokemonList");
const loadMore = document.getElementById("loadMore");
const searchInput = document.getElementById("search");
const limit = 200;
let offset = 0;
let allPokemons = [];

function loadPokemon(offset, limit) {
  pokeApi.getPokemons(offset, limit)
    .then((pokemons = []) => {
      allPokemons = allPokemons.concat(pokemons);
      displayPokemons(allPokemons);
    })
}

function displayPokemons(pokemons) {
  pokemonList.innerHTML = pokemons.map((pokemon) =>
    ` <li class="pokemon ${pokemon.type}">
          <span class="number">#${pokemon.number}</span>
          <span class="name">${pokemon.name}</span>

          <div class="detail">
              <ul class="types">
                  ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join("")}
              </ul>

              <img src="${pokemon.image}" alt="${pokemon.name}">
          </div>
      </li>`
  ).join("");
}

function searchPokemon(query) {
  const filteredPokemons = allPokemons.filter(pokemon =>
    pokemon.name.toLowerCase().includes(query.toLowerCase()) ||
    pokemon.number.toString() === query
  );
  displayPokemons(filteredPokemons);
}

loadPokemon(offset, limit);

loadMore.addEventListener("click", () => {
  offset += limit;
  loadPokemon(offset, limit);
});

searchInput.addEventListener("input", (event) => {
  const query = event.target.value.trim();
  if (query) {
    searchPokemon(query);
  } else {
    displayPokemons(allPokemons);
  }
});
