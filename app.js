'use strict'

var express = require('express');
var bodyParser = require('body-parser');
const { restart } = require('nodemon');


var app = express();

/**
 * en esta variables hacemos llamados de las rutas creadas en el folder routes
 * 
 */
var project_routes = require('./routes/projects');


//middlewares
app.use(bodyParser.urlencoded({extended: false}));


//esta parte nos servira para cualquier peticion que se haga lo convierte a json
app.use(bodyParser.json());

//CORS
// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//rutas
//para cargarlo hay que poner http://localhost:3000/api/test
app.use('/api', project_routes);






//exportar 
module.exports = app;