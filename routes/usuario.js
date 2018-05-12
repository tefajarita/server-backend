//Requires
var express = require('express');
var bcrypt = require('bcryptjs');
//Inicializar variables
var app = express();
//importacion del modelo 
var Usuario = require('../models/usuario');
//Rutas 

//==========================
//Obtener todos los usuarios||
//==========================
app.get('/', (req, res, next) => {

    Usuario.find({}, 'id nombre email img role')
        .exec(
            (err, usuarios) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando usuarios',
                        errors: err
                    });
                }


                return res.status(200).json({
                    ok: true,
                    usuarios: usuarios
                });

            })



});

//==========================
//Crear usuario             ||
//==========================

app.post('/', (req, res) => {
    var body = req.body;
    var usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: body.password,
        img: body.img,
        role: body.role
    });

    usuario.save((err, usuarioGuardado) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al crear usuario',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            usuario: usuarioGuardado
        });

    });

});
module.exports = app;