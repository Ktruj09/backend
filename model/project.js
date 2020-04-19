'use strict'

var mongoose = require('mongoose');

//esquema modelo
var Schema = mongoose.Schema;

//molde en el cual trabajaremos y se añada valores
var ProjectSchema = Schema({

    name: String,
    description: String,
    category: String,
    year: Number,
    langs: String,
    imagen: String

});

module.exports = mongoose.model('projects',ProjectSchema);