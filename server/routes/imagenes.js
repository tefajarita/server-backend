const express = require('express');
const fs = require('fs');
let path = require('path');
let app = express();
const { verificarTokenUrl } = require('../middlewares/autenticacion');

app.get('/:tipo/:img', verificarTokenUrl, (req, res, next) => {

    let tipo = req.params.tipo;
    let img = req.params.img;

    let pathImagen = `../../uploads/${ tipo }/${ img }`;
    let imagenPath = path.resolve(__dirname, pathImagen);
    console.log(pathImagen);

    if (fs.existsSync(imagenPath)) {
        res.sendFile(imagenPath);
    } else {
        agenPath = path.resolve(__dirname, '../assets/no-img.jpg');
        res.sendFile(imagenPath);
    }



});

module.exports = app;