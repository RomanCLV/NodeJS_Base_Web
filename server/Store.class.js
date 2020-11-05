const fs = require('fs');

/*
Exercice 01:
Completer les fonctions de cette Class (add, delete, get, patch, replace)
Et les utiliser dans les routes
*/

/*
Exercice 02:
- Persister la donnee dans un fichier JSON
- Choix du chemin de sauvegarde via les `options`

functions a terminer: save, autoSave, autoLoad
*/

let nbOfInstances = 0;

class Store {
    constructor(name, options) {
        this.name = name;
        this.content = { };

        this.filePath = options.filePath;
        this.interval = undefined;
        this.persistTime = options.persistTime || 3000; // temps en ms

        //this.autoLoad();
        //this.autoSave();
    }
    
    get() {
        return this.content;
    }

    getById(id) {
        return this.content[id];
    }
    
    add(resource) {
        resource.id = nbOfInstances;
        this.content[nbOfInstances] = resource;
        nbOfInstances++;
        return resource;
    }

    delete(id) {
        if (!this.content[id])
            return false;
        delete this.content[id];
        return true;
    }

    replace(id, resource) {
        if (!this.content[id])
            return false;
        this.content[id] = resource;
        return resource;
    }

    patch(id, resource) {
        if (!this.content[id])
            return false;
        this.content[id] = { ...this.content[id], ...resource };
        return this.content[id];
    }

    autoSave() {
        if (!this.filePath) return ;
        this.interval = setInterval(() => {
            this.save()
        }, this.persistTime);
    }

    autoLoad() {
        if (!this.filePath) return ;
        const exist = fs.existsSync(this.filePath);
        if (!exist) {
            fs.writeFileSync(this.filePath, JSON.stringify(this.content));
        }
        const str_data = fs.readFileSync(this.filePath).toString('utf-8');
        this.content = JSON.parse(str_data);
    }

    save() {
        fs.writeFile(this.filePath, JSON.stringify(this.content), (err) => {
            if (!err)
                console.log(`File Store ${this.name} saved`);
            else
                console.error('Cannot save Store ' + this.name);
        })
    }
}

exports.Store = Store;
