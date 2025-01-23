// Hacemos un fetch

function getRickAndMortyApi() {
    const RickAndMortyNameInput = document.getElementById('characterName');
    const RickAndMortyInfo = document.getElementById('RickAndMortyInfo');

    const characterName = RickAndMortyNameInput.value.toLowerCase();

    fetch(`http://localhost:3000/characters/${characterName}`)
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            RickAndMortyInfo.innerHTML = `<p>${data.error}</p>`;
        } else {
            const { name, status, species, gender, origin, image } = data;
            RickAndMortyInfo.innerHTML = `
            <h2>${name}</h2>
            <p><strong>Status:</strong> ${status}</p>
            <p><strong>Species:</strong> ${species}</p>
            <p><strong>Gender:</strong> ${gender}</p>
            <p><strong>Origin:</strong> ${origin}</p>
            <img src="${image}" alt="${name}" />
            `;
        }
    })
    .catch(error => {
        RickAndMortyInfo.innerHTML = `<p> Imposible acceder al personaje</p>`;
    });
};