//Requires
var express = require('express');
var bcrypt = require('bcryptjs');

//Validaciones addicionales

const _ = require('underscore');
//Inicializar variables
var app = express();
//importacion del modelo 
var Usuario = require('../models/usuario');
//Rutas 

//==========================
//Obtener todos los usuarios||
//==========================
app.get('/', (req, res, next) => {
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);
    Usuario.find({}, 'nombre email google img estado role')
        .skip(desde)
        .limit(5)
        .exec(
            (err, usuarios) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando usuarios',
                        errors: err
                    });
                }

                Usuario.count({}, (err, conteo) => {
                    return res.status(200).json({
                        ok: true,
                        usuarios,
                        cuantos: conteo
                    });
                });


            })



});

//==========================
//Crear usuario             ||
//==========================

app.post('/', (req, res) => {
    let body = req.body;
    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        img: body.img,
        role: body.role
    });

    usuario.save((err, usuarioGuardado) => {

        if (err) {
            return res.status(400).json({
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


//==========================
//Actualizar usuario             ||
//==========================


app.put('/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body,
        'nombre',
        'email',
        'img',
        'role'
    );

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    })

});



//==========================
//Eliminar usuario   existen dos maneras de borrar registros, pero por integridad de los datos se activa          ||
//==========================


app.delete('/:id', function(req, res) {
    let id = req.params.id;

    Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!usuarioBorrado) {
            return res.status(410).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        }

        res.json({
            ok: true,
            usuario: usuarioBorrado
        });

    });
});

module.exports = app;