//este nos permite ejecutar las rutas creadas en el el archivo que esta en la carpeta 
//controllers project.js

'use strict'

var express = require('express');

//esta variable sirve para cargar el controllador
var ProjectController = require('../controllers/project');


//variable para cargar router
var router = express.Router();

//middewer, es algo que se ejecuta antes que el controlador
//este middlewer se tiene que ejecutar antes que la acción
var multipart = require('connect-multiparty');
//en esta parte se guardaran los archivos
var multipartMiddleware = multipart ({uploadDir: './uploads'});

router.get('/home', ProjectController.home);
router.post('/test', ProjectController.test);
router.post('/save-project', ProjectController.saveProject);

//el :id? se solicita que se inserte obligatoriamente. 

router.get('/project/:id?', ProjectController.getProject);

//get nos sirve para extraer archivos 
router.get('/projects', ProjectController.getProjects);

router.put('/project/:id', ProjectController.updateProject);

router.delete('/projectRemove/:id', ProjectController.deleteProject);

//añadimos una imagne
router.post('/upload-image/:id', multipartMiddleware,  ProjectController.uploadImage);

module.exports = router;