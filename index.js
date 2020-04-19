'use strict'

var mongoose = require('mongoose');

/**
 * en esta parte nos servira para hacer llamado a la ubicación de nuestro archivo 
 * app.js para poder crear conexión al servidor 
 * y pondremos un puerto en el cual nos servira para la conexión 
 * */
var app = require('./app');
var port = 3000;

//conexion a la base de datos

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/portafolio')
        .then(()=>{
            console.log("Conexión a la base de datos con exito....");

            //Creación del servidor 
            app.listen(port, ()=> {
                console.log("Servidor Corriendo Correctamente en la url: localhost:3000");
            });


        })
        .catch(err => console.log(err));