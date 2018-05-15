//Requires
var express = require('express');

//Inicializar variables
var app = express();

//Rutas 
app.get('/', (req, res, next) => {
    res.status(200).json({
        ok: true,
        mensaje: 'Consulta se ha realizado éxitosamente'
    })


});

module.exports = app;