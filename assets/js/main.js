const pokemonList = document.getElementById("pokemonList");
const loadMore = document.getElementById("loadMore");
const limit = 10;
let offset = 0;

function loadPokemon(offset, limit) {
    pokeApi.getPokemons(offset, limit)
        .then((pokemons = []) => {
            pokemonList.innerHTML += pokemons.map((pokemon) =>
                `
                <li class="pokemon ${pokemon.type}">
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
        })
}

loadPokemon(offset, limit);

loadMore.addEventListener("click", () => {
    offset += limit;
    loadPokemon(offset, limit);
});
