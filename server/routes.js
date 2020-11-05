const Router = require('express').Router;
const router = Router();
const store = require('./store');

/*
Exercice:

4 Routes
- 1) recuperer un objet avec son ID     GET
- 2) creer un objet                     POST
- 3) replace une resource avec son ID   PUT
- 4) patch une resource avec son ID     PATCH
- 5) delete une resource son ID         DELETE
----------------------------------------

Contraintes:
- Le plus RESTful possible (methodes, json)
- Un fichier de test:
    _> ajoute, get, modifie, get, et supprime la ressource.
*/

/*

La méthode GET est utilisée pour récupérer les données du serveur. Il s'agit d'une méthode en lecture seule, elle ne présente donc aucun risque de mutation ou de corruption des données. Par exemple, si nous appelons la méthode get sur notre API, nous récupérerons une liste de toutes les tâches à effectuer.
La méthode POST envoie des données au serveur et crée une nouvelle ressource. La ressource qu'il crée est subordonnée à une autre ressource parent. Lorsqu'une nouvelle ressource est POSTÉE au parent, le service API associera automatiquement la nouvelle ressource en lui attribuant un ID (nouvel URI de ressource). En bref, cette méthode est utilisée pour créer une nouvelle entrée de données.
La méthode DELETE est utilisée pour supprimer une ressource spécifiée par son URI.
La méthode PUT est le plus souvent utilisée pour mettre à jour une ressource existante. Si vous souhaitez mettre à jour une ressource spécifique (fournie avec un URI spécifique), vous pouvez appeler la méthode PUT vers cet URI de ressource avec le corps de la requête contenant la nouvelle version complète de la ressource que vous essayez de mettre à jour.
La méthode PATCH est très similaire à la méthode PUT car elle modifie également une ressource existante. La différence est que pour la méthode PUT, le corps de la requête contient la nouvelle version complète, tandis que pour la méthode PATCH, le corps de la requête n'a besoin que de contenir les modifications spécifiques apportées à la ressource, en particulier un ensemble d'instructions décrivant comment cette ressource doit être modifiée. , et le service API créera une nouvelle version conformément à cette instruction.

*/

// Enregistrer une route, methode GET, url /resources/ID_RESOURCE
// Recuperer une ressource avec son id
router.get('/', (req, res) => {
    res.json(store.resources.get());
})

router.get('/:id', (req, res) => {
    const id = req.params.id;
    res.json(store.resources.getById(id));
})

// Creer une nouvelle ressource
router.post('/', (req, res) => {
    const resource = store.resources.add(req.body);
    res.json(resource);
})

// remplacer une ressource
router.put('/:id', (req, res) => {
    const id = req.params.id;
    if (id !== req.body.id)
        return res.status(400).end();
    const tryReplace = store.resources.replace(id, req.body);
    if (!tryReplace)
        res.status(404).end();
    res.json(tryReplace);
})

// patch une ressource
router.patch('/:id', (req, res) => {
    const id = req.params.id;
    const resource = store.resources.patch(id, req.body);
    res.json(resource);
})

// supprimer
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const tryDelete = store.resources.delete(id);
    if (!tryDelete)
        return res.status(404).end();
    res.json({ success: tryDelete });
})

module.exports = router;
