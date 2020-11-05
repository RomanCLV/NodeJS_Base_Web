const Router = require('express').Router;
const router = Router();

const store = {
    resources: [
        { id: 0, name: "roman" },
        { id: 1, name: "coco" },
        { id: 2, name: "anto" }
    ]
};

/*
Exercice:

4 Routes
- 1) recuperer un objet avec son ID
- 2) creer un objet 
- 3) replace une resource avec son ID
- 4) patch une resource avec son ID
- 5) delete une resource son ID
----------------------------------------

Contraintes:
- Le plus RESTful possible (methodes, json)
- Un fichier de test:
    _> ajoute, get, modifie, get, et supprime la ressource.
*/

//#region GET

router.get('/', function(req, res, next) {
    res.json(store.resources);
});

router.get('/:id', function(req, res) {
    let info = store.resources.find(value => value.id === req.params.id);
    if (info === undefined) {
        res.status(404).json();
    }
    else {
        res.json(info);
    }
});

//#region A ne pas faire

// router.get('/create/:id/:name', function(req, res) {
//     let info = store.resources.find(value => value.id === req.params.id)
//     if (info === undefined) {
//         let newObject = {
//             "id": req.params.id,
//             "name": req.params.name,
//         };
//         store.resources.push(newObject);
//         res.json(newObject);
//     }
//     else {
//         res.json("An user is already existing at " + req.params.id);
//     }
// });

// router.get('/modify/:id/:name', function(req, res) {
//     let info = store.resources.find(value => value.id === req.params.id);
//     if (info === undefined) {
//         res.json("No user at: " + req.params.id);
//     }
//     else {
//         const index = store.resources.indexOf(info);
//         store.resources[index].name = req.params.name;
//         res.json(info);
//     }
// });

// router.get('/replace/:toReplace/:id/:name', function(req, res) {
//     console.log(store.resources.length);
//     console.log(req.params.toReplace);
//     if (store.resources.length <= req.params.toReplace) {
//         res.json("No resource at: " + req.params.toReplace);
//     }
//     else {
//         store.resources[req.params.toReplace] = {
//             "id": req.params.id,
//             "name": req.params.name,
//         };
//         res.json(store.resources[req.params.toReplace]);
//     }
// })

// router.get('/delete/:id', function(req, res) {
//     let info = store.resources.find(value => value.id === req.params.id);
//     if (info === undefined) {
//         res.json("No user at: " + req.params.id);
//     }
//     else {
//         let index = store.resources.indexOf(info);
//         store.resources.splice(index, 1);
//         res.json(store.resources);
//     }
// });

//#endregion

//#endregion

router.post('/', (req, res) => {
    const data = req.body;
    data.id = store.resources.length; // auto incremented id
    store.resources.push(data);
    res.json(data);
});

router.put('/', (req, res) => {
    const userID = req.body.id;
    const user = store.resources.find(usr => usr.id === userID)
    if (user === undefined) {
        res.status(404).json();
    }
    else {
        const id = store.resources.indexOf(user);
        store.resources.splice(id, 1);
        res.json( { success: true } );
    }
});

module.exports = router;
