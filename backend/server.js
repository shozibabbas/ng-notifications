var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var api = require('./api');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use(express.static(path.join(__dirname, 'dist/xgrid-notifications')));
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.get('/', (req, res) => res.send('Hello World!'));
app.get('/hello', (req, res) => res.send('Hello!'));

module.exports = app;
