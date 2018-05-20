const express = require('express');

const app = express();

//importar rutas
const usuarioRoutes = require('../routes/usuario');
const loginRoutes = require('../routes/login');
const appRoutes = require('../routes/app');
const empresaRoutes = require('../routes/empresa');
const ciudadRoutes = require('../routes/ciudad');
const sectorRoutes = require('../routes/sector');
const uploadRoutes = require('../routes/upload');
const imagenesRoutes = require('../routes/imagenes');

app.use('/usuario', usuarioRoutes);
app.use('/login', loginRoutes);
app.use('/empresa', empresaRoutes);
app.use('/ciudad', ciudadRoutes);
app.use('/sector', sectorRoutes);
app.use('/upload', uploadRoutes);
app.use('/imagen', imagenesRoutes);
app.use('/', appRoutes);
module.exports = app;