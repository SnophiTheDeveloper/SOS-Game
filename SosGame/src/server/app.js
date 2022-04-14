const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require("express-session");
const WsHandler = require('./ws-handler');
const app = express();
const gameApi = require('./api/game-api');
const homeApi = require('./api/home-api')


app.use(express.static('public'));
app.use(bodyParser.json());
WsHandler.init(app);

// Route
app.use('/api',gameApi);
app.use('/api',homeApi.router);



app.use((_req, res, _next) => {
    res.sendFile(path.resolve(__dirname, '..', '..', 'public', 'index.html'));
});

module.exports = app;