//Archivo de configuracion para el ambiente de producción en heroku

const config = require('./config/config');

//Requires
const express = require('express');
const mongoose = require('mongoose');
//Inicializar variables
const app = express();
const bodyParser = require('body-parser')

//Conexion a la base de datos 
mongoose.connection.openUri(process.env.URLDB, (err, res) => {

    if (err) throw err;
    console.log('La base de datos esta conectada exitosamente: \x1b[32m%s\x1b[0m', 'conectada');

});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//configuracion global de rutas
app.use(require('./routes/index'));


//Escuchar petición 
app.listen(process.env.PORT, () => {
    console.log('Express  server puerto : \x1b[32m%s\x1b[0m', process.env.PORT + ' online');
});