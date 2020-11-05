const express = require('express');
const middlewares = require('./middlewares');
const defaultRouter = require('./routes');

const app = express();
const port = 3000;

app.disable('x-powered-by');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(middlewares.printReq);

app.get('/', middlewares.printReq, (request, response) => {
    response.json({ success: true });
});

app.post('/', (req, res) => {
    res.json({ success: true });
});

app.use('/api', defaultRouter);

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}\n`);
});
