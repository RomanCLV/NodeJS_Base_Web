const path = require('path')
const { Store } = require('./Store.class');

const str_resources_filePath = path.resolve(__dirname, 'data', 'resources.json')

const store = {
    resources: new Store('resources', { filePath: str_resources_filePath, persistTime: 10000 })
};

module.exports = store;
