const pokemonDataArray = []
async function collectPokemon() {
    const request = await fetch('https://pokeapi.co/api/v2/pokemon/')
    const dataList = await request.json()

    for (const { url } of dataList.results) {
        const pokemonResponse = await fetch(url)
        const pokemonData = await pokemonResponse.json()

        pokemonDataArray.push({
            name: pokemonData.name,
            image: pokemonData.sprites.front_default,
        })
    }
    visualisPokeList(pokemonDataArray);
}

function visualisPokeList(dataListOfPoke){
    const ul = document.getElementById('pokemonList')
    ul.innerHTML = ''

    dataListOfPoke.forEach(pokemonData =>{
        const pokemonCard = document.createElement('div')
        pokemonCard.className = 'card'

        const pokemonImg = document.createElement('img')
        pokemonImg.src = pokemonData.image
        pokemonImg.alt = pokemonData.name

        const pokemonName = document.createElement('h3')
        pokemonName.innerHTML = pokemonData.name

        pokemonCard.append(pokemonImg,pokemonName)
        ul.append(pokemonCard)
    })
}

document.getElementById('sortButton').addEventListener('click', () =>{
    pokemonDataArray.sort((first,next) => {
        const firstName = first.name.toUpperCase()
        const nextName = next.name.toUpperCase()

        if(firstName < nextName) {
            return -1
        }
        if(nextName > firstName) {
            return 1
        }
        return 0
    })
    visualisPokeList(pokemonDataArray)
})

document.getElementById('searchInput').addEventListener('input', (event) =>{
    const searchTerm = event.target.value.toLowerCase()
    const filteredList = pokemonDataArray.filter(pokemonFilter => {
        return pokemonFilter.name.toLowerCase().includes(searchTerm)
    })
    visualisPokeList(filteredList)
})

document.getElementById('pokemonList').addEventListener('click', (event) =>{
    console.log("clicked 1")
    if (event.target.classList.contains('card')) {
        const clickedPokemonName = event.target.querySelector('h3').innerText;
        const clickedPokemon = pokemonDataArray.find(pokemon => pokemon.name === clickedPokemonName);

        if (clickedPokemon) {
            console.log("clikced")
            openModule(clickedPokemon);
        }
    }
})

function openModule(pokemonDeatils){
    const moduleContainer = document.createElement('div')
    moduleContainer.className = 'module'

    const moduleContent = document.createElement('div')
    moduleContent.className = 'module-content'

    const closeButton = document.createElement('span')
    closeButton.className = 'close-button'
    closeButton.innerHTML = '&times'

    closeButton.addEventListener('click', () =>{
        closeModule(moduleContainer)
    })

    const details = `<h2>${pokemonDeatils.name}</h2>
    <img src="${pokemonDeatils.image}" alt="${pokemonDeatils.name}">
    <p>For more Information Visit : ${pokemonDeatils.image}</p>`

    moduleContent.innerHTML = details;
    moduleContent.appendChild(closeButton);
    moduleContainer.appendChild(moduleContent);
    document.body.appendChild(moduleContainer);
}

function closeModule(moduleContainer) {
    document.body.removeChild(moduleContainer);
}

collectPokemon()