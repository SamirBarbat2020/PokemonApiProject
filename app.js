let counter;

let poke_container = document.getElementById('poke_container');
const pokemonsNumber = 24;
fetchPokemon();

async function fetchPokemon() {
    poke_container.innerHTML = '';
    for (let i = 1; i <= pokemonsNumber; i++) {
        await getPekomon(i);
        counter = i;
    }
}

async function getPekomon(id) {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;

    let response = await fetch(url);
    let responseAsJson = await response.json();
    //console.log(responseAsJson);
    createPokemonCard(responseAsJson);
}

async function createPokemonCard(responseAsJson) {

    const name = responseAsJson.name[0].toUpperCase() + responseAsJson.name.slice(1);
    poke_container.innerHTML += `
    <div onclick = 'showPoke(${JSON.stringify(responseAsJson)})'>
    <img src= "${responseAsJson.sprites.other.home.front_shiny}">
    <h3>${name}</h3>
    <p>#${responseAsJson.id}</p>
    <h4>Weight: ${responseAsJson.weight}</h4>
    <h4>Move: ${responseAsJson.moves[0].move.name}</h4>
    </div>
    `;
}

function showPoke(responseAsJson) {
    //counter = responseAsJson;
    document.getElementById('dialog').classList.remove('d-none');
    document.getElementById('dialog').innerHTML = `
    
        <div class="dialog">
            <div class = "img-section">
            <img src= "${responseAsJson.sprites.other.home.front_shiny}">
            </div>
            <div class = "info-section">
            <div><h4>Name: ${responseAsJson.name}</h4></div>
            <div><h4>ID: ${responseAsJson.id}</h4></div>
            <div><h4>Weight: ${responseAsJson.weight} KG</h4></div>
            </div>
            <div id="close-sign"><div><i onclick = "closeCard()" class="fa-solid fa-circle-xmark fa-xl" style = "color: #83EB85"></i></div></div>
        </div>
   
        `;

    console.log(responseAsJson);
}

function closeCard() {
    document.getElementById('dialog').classList.add("d-none");
}
