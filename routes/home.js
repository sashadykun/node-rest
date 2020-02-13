const express = require('express');
const routes = express.Router();

app.use

routes.get('/', (req, res) => {
    res.render('index', {title: 'API express app', message: 'connected'})
});

module.exports = routes;