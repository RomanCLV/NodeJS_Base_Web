const axios = require("axios");

const urlApi = "localhost:3000/api/";

async function main() {
    await getAll();
    await getById(0);
}

async function getAll() {
    await axios.get(urlApi)
        .then(data => {
            console.log("GET - Success:");
            console.log(data.data)
        })
        .catch(err => {
            console.log("GET - Error:");
            console.log(err);
        })
}

async function getById(id) {
    await axios.get(urlApi + id)
        .then(data => {
            console.log("GET - Success:");
            console.log(data.data)
        })
        .catch(err => {
            console.log("GET - Error:");
            console.log(err);
        })
}

main();
