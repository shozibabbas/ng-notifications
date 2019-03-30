const express = require('express');
const bodyParser = require('body-parser');

// create express app
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// add routes
var api = require('./api');

app.get('/', (req, res) => res.send('Hello World!'));
app.get('/hello', (req, res) => res.send('Hello Shozib!'));

app.use('/api', api);

// start express after db is initialized
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

