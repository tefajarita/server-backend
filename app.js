//Archivo de configuracion para el ambiente de producción en heroku

const config = require('./config/config');

//Requires
var express = require('express');
var mongoose = require('mongoose');
//Inicializar variables
const app = express();
var bodyParser = require('body-parser')

//Conexion a la base de datos 
mongoose.connection.openUri('mongodb://localhost:27017/BolsaEmpleoDb', (err, res) => {

    if (err) throw err;
    console.log('La base de datos esta conectada exitosamente: \x1b[32m%s\x1b[0m', 'conectada');

});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Importar Rutas 
var usuarioRoutes = require('./routes/usuario');
var loginRoutes = require('./routes/login');
var appRoutes = require('./routes/app');

//Ruta
app.use('/usuario', usuarioRoutes);
app.use('/login', loginRoutes);
app.use('/', appRoutes);



//Escuchar petición 
app.listen(process.env.PORT, () => {
    console.log('Express  server puerto : \x1b[32m%s\x1b[0m', process.env.PORT + ' online');
});