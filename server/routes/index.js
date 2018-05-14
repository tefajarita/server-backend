const express = require('express');

const app = express();

//importar rutas
const usuarioRoutes = require('../routes/usuario');
const loginRoutes = require('../routes/login');
const appRoutes = require('../routes/app');


app.use('/usuario', usuarioRoutes);
app.use('/login', loginRoutes);
app.use('/', appRoutes);
module.exports = app;