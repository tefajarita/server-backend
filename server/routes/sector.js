//Requires
var express = require('express');

//Inicializar variables
var app = express();
//importacion del modelo 
var Sector = require('../models/sector');

//middlewares
const { verificaToken, verificarAdminRole } = require('../middlewares/autenticacion');
//Rutas 

//==========================
//Obtener todos los sectores||
//==========================
app.get('/', (req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);
    let estado = true;
    let limite = req.query.limite || 5;
    limite = Number(limite);
    Sector.find({})
        .skip(desde)
        .limit(5)
        .exec(
            (err, sectores) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando sectores',
                        errors: err
                    });
                }

                Sector.count({}, (err, conteo) => {
                    return res.status(200).json({
                        ok: true,
                        sectores,
                        cuantos: conteo
                    });
                });


            })



});

//==========================
//Crear sectores     , [verificaToken, verificarAdminRole]        ||
//==========================

app.post('/', (req, res) => {

    let body = req.body;
    let sector = new Sector({
        nombre: body.nombre
    });

    sector.save((err, sectorGuardado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear sector',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            sector: sectorGuardado
        });

    });

});


//==========================
//Actualizar sector             ||
//==========================


app.put('/:id', [verificaToken, verificarAdminRole], (req, res) => {
    let id = req.params.id;


    Usuario.findByIdAndUpdate(id, req.body, { new: true, runValidators: true }, (err, usuarioDB) => {
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


app.delete('/:id', [verificaToken, verificarAdminRole], function(req, res) {

    let id = req.params.id;
    //Usuario.findByIdAndRemove(id,(err,UsuarioBorrado))
    Sector.findByIdAndUpdate(id, { new: true }, (err, sectorBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!sectorBorrado) {
            return res.status(410).json({
                ok: false,
                err: {
                    message: 'Sector no encontrado'
                }
            });
        }

        res.json({
            ok: true,
            sector: sectorBorrado
        });




    });
});

module.exports = app;