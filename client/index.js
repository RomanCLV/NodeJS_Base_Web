const axios = require("axios");
const { put } = require("../server/routes");

const urlApi = "http://localhost:3000/api/";

async function main() {
    await addUser({name: "roro"});
    await addUser({name: "anto"});
    await getById(1);
    await getAll();
    await putUserById(1, { id: 1, name: "coach"});
    await getAll();
    await patchUserById(1, {id: 11, pseudo: "le goulag"});
    await getAll();
    await deleteUserById(0);
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

async function putUserById(id, user) {
    await axios.put(urlApi + id, user)
        .then(data => {
            console.log("PUT BY ID - Success:");
            console.log(data.data);
            console.log();
        })
        .catch(err => {
            console.log("PUT BY ID - Error: " + err.response.status + "\n");
        });
}

async function patchUserById(id, user) {
    await axios.patch(urlApi + id, user)
        .then(data => {
            console.log("PATCH BY ID - Success:");
            console.log(data.data);
            console.log();
        })
        .catch(err => {
            console.log("PATCH BY ID - Error: " + err.response.status + "\n");
        });
}

async function deleteUserById(id) {
    await axios.delete(urlApi + id)
        .then(data => {
            console.log("DELETE BY ID - Success:");
            console.log(data.data);
            console.log();
        })
        .catch(err => {
            console.log("DELETE BY ID - Error: " + err.response.status + "\n");
        });
}

main();
