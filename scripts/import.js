import fetch from 'node-fetch';
import db from "../utils/db.js"
const {Characters, Movies} = db

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

    console.log(`Importing ${charactersData.length} characters ...`)
    try {
        await Characters.bulkCreate(charactersData);
    } catch (error) {
        throw new Error('Error bulk creating characters:', error);
    }

    console.log(`Importing ${moviesData.length} movies ...`)
    try {
        await Movies.bulkCreate(moviesData);
    } catch (error) {
        throw new Error('Error bulk creating characters:', error);
    }

    console.log("Import finished ! ✨")
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