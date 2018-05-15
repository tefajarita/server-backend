const express = require('express');

const app = express();

//importar rutas
const usuarioRoutes = require('../routes/usuario');
const loginRoutes = require('../routes/login');
const appRoutes = require('../routes/app');
const empresaRoutes = require('../routes/empresa');
const ofertaRoutes = require('../routes/oferta');
const departamentoRoutes = require('../routes/departamento');
const ciudadRoutes = require('../routes/ciudad');
const sectorRoutes = require('../routes/sector');


app.use('/usuario', usuarioRoutes);
app.use('/login', loginRoutes);
app.use('/empresa', empresaRoutes);
app.use('/oferta', ofertaRoutes);
app.use('/departamento', ofertaRoutes);
app.use('/ciudad', ofertaRoutes);
app.use('/sector', ofertaRoutes);
app.use('/', appRoutes);
module.exports = app;