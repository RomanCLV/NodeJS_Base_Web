const axios = require("axios");

const urlApi = "http://localhost:3000/api/";

async function main() {
    await getAll();
    //await getById(0);
    //await addUser({name: "bryan"});
    //await getAll();
    await putUserById(1);
    await getAll();
}

async function getAll() {
    await axios.get(urlApi)
        .then(data => {
            console.log("GET ALL - Success:");
            console.log(data.data);
            console.log();
        })
        .catch(err => {
            console.log("GET ALL - Error: " + err.response.status + "\n");
        });
}

async function getById(id) {
    await axios.get(urlApi + id)
        .then(data => {
            console.log("GET BY ID - Success:");
            console.log(data.data);
            console.log();
        })
        .catch(err => {
            console.log("GET BY ID - Error: " + err.response.status + "\n");
        });
}

async function addUser(user) {
    await axios.post(urlApi, user)
        .then(data => {
            console.log("POST - Success:");
            console.log(data.data);
            console.log();
        })
        .catch(err => {
            console.log("POST - Error: " + err.response.status + "\n");
        });
}

async function putUserById(id) {
    await axios.put(urlApi, { id })
        .then(data => {
            console.log("PUT BY ID - Success:");
            console.log(data.data);
            console.log();
        })
        .catch(err => {
            console.log("PUT BY ID - Error: " + err.response.status + "\n");
        });
}

main();
