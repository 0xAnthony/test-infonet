import fetch from 'node-fetch';

async function fetchData() {
    console.log(`Loading characters ...`)
    const charactersRawData = await fetchAllData("https://swapi.dev/api/people/")
    const charactersData = charactersRawData.map(({name, mass, height, gender}, id) => ({
        id,
        name,
        mass,
        height,
        gender,
        picture: ''
    }))

    console.log(`Loading movies ...`)
    const moviesRawData = await fetchAllData("https://swapi.dev/api/films/")
    const moviesData = moviesRawData.map(({title ,episode_id}) => ({
        id: episode_id,
        name: title
    }))


}


async function fetchAllData(url, currentData = []) {
    try {
        const peopleResponse = await fetch(url);

        if (!peopleResponse.ok) {
            throw new Error('Network response was not ok');
        }

        const peopleRawData = await peopleResponse.json();

        if (peopleRawData.next) {
            return fetchAllData(peopleRawData.next, [...currentData, ...peopleRawData.results])
        }

        return [...currentData, ...peopleRawData.results]
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

fetchData();