//Requires
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const app = express();
const Usuario = require('../models/usuario');


app.post('/', (req, res) => {
    let body = req.body;

    Usuario.findOne({ email: body.email }, (err, UsuarioDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!UsuarioDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario o contraseña incorrecto'
                }
            });
        }


        if (!bcrypt.compareSync(body.password, UsuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario o contraseña incorrecto'
                }
            });
        }
        //genero el token
        let token = jwt.sign({
                Usuario: UsuarioDB
            },
            process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });

        res.json({
            ok: true,
            Usuario: UsuarioDB,
            token
        });
    });

});

//------------------
//exportacion de la rutas

module.exports = app;