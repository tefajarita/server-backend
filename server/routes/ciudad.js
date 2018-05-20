//Requires
var express = require('express');

//Inicializar variables
var app = express() //importacion del modelo 
var Ciudad = require('../models/ciudad');

//middlewares
const { verificaToken, verificarAdminRole } = require('../middlewares/autenticacion');
//Rutas 

//==========================
//Obtener todos las ciudades||
//==========================
app.get('/', (req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);
    let estado = true;
    let limite = req.query.limite || 5;
    limite = Number(limite);
    Ciudad.find({})
        .skip(desde)
        .limit(5)
        .exec(
            (err, ciudades) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando todas las ciudades',
                        errors: err
                    });
                }

                Ciudad.count({}, (err, conteo) => {
                    return res.status(200).json({
                        ok: true,
                        ciudades,
                        cuantos: conteo
                    });
                });


            })



});

//==========================
// Obtener ciudad por id
//==========================

app.get('/:id', (req, res) => {
    let id = req.params.id;

    Ciudad.findById(id, (err, ciudadDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            ciudad: ciudadDB
        });
    })

});

//==========================
//Crear Ciudades     , [verificaToken, verificarAdminRole]        ||
//==========================

app.post('/', [verificaToken, verificarAdminRole], (req, res) => {

    let body = req.body;
    let ciudad = new Ciudad({
        ciudad: body.ciudad,
        estado: body.estado
    });

    ciudad.save((err, ciudadGuardada) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear la ciudad',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            ciudad: ciudadGuardada
        });

    });

});


//==========================
//Actualizar usuario             ||
//==========================


app.put('/:id', [verificaToken, verificarAdminRole], (req, res) => {
    let id = req.params.id;

    Ciudad.findByIdAndUpdate(id, req.body, { new: true }, (err, ciudadDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            ciudad: ciudadDB
        });
    })

});



//==========================
//Eliminar ciudad   existen dos maneras de borrar registros, pero por integridad de los datos se activa          ||
//==========================


app.delete('/:id', [verificaToken, verificarAdminRole], function(req, res) {

    let id = req.params.id;
    //Usuario.findByIdAndRemove(id,(err,UsuarioBorrado))
    Ciudad.findByIdAndUpdate(id, (err, ciudadBorrada) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!ciudadBorrada) {
            return res.status(410).json({
                ok: false,
                err: {
                    message: 'Ciudad no encontrada'
                }
            });
        }

        res.json({
            ok: true,
            ciudad: ciudadBorrada
        });




    });
});

module.exports = app;