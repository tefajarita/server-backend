//Requires
var express = require('express');

//Validaciones addicionales

const _ = require('underscore');
//Inicializar variables
var app = express();
//importacion del modelo 
var Empresa = require('../models/empresa');

//middlewares
const { verificaToken, verificarEmpresaRole } = require('../middlewares/autenticacion');
//Rutas 

//==========================
//Obtener todos los Empresas||
//==========================
app.get('/', verificaToken, (req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);
    let estado = true;
    let limite = req.query.limite || 5;
    limite = Number(limite);
    Empresa.find({ estado: true }, 'nombre email google img estado role')
        .skip(desde)
        .limit(5)
        .exec(
            (err, Empresas) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando Empresas',
                        errors: err
                    });
                }

                Empresa.count({ estado: true }, (err, conteo) => {
                    return res.status(200).json({
                        ok: true,
                        Empresas,
                        cuantos: conteo
                    });
                });


            })



});

//==========================
//Crear Empresa             ||
//==========================

app.post('/', [verificaToken, verificarEmpresaRole], (req, res) => {

    let body = req.body;
    let empresa = new Empresa({
        nombre: body.nombre,
        img: body.img,
        descripcion: body.descripcion,
        usuario: req.usuario._id,
        ubicacion: req.departamento._id,
        sector: req.sector._id
    });

    empresa.save((err, EmpresaGuardado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear Empresa',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            empresa: EmpresaGuardado
        });

    });

});


//==========================
//Actualizar Empresa             ||
//==========================


app.put('/:id', [verificaToken, verificarEmpresaRole], (req, res) => {
    let id = req.params.id;
    let usuario = req.usuario._id;
    let ubicacion = req.departamento._id;
    let sector = req.sector._id;
    let body = _.pick(req.body,
        'nombre',
        'descripcion',
        'img'
    );

    Empresa.findByIdAndUpdate(id, usuario, ubicacion, sector, body, { new: true, runValidators: true }, (err, EmpresaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            Empresa: EmpresaDB
        });
    })

});



//==========================
//Eliminar Empresa   existen dos maneras de borrar registros, pero por integridad de los datos se activa          ||
//==========================


app.delete('/:id', [verificaToken, verificarEmpresaRole], function(req, res) {

    let id = req.params.id;

    //Empresa.findByIdAndRemove(id,(err,EmpresaBorrado))
    Empresa.findByIdAndRemove(id, (err, EmpresaBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!EmpresaBorrado) {
            return res.status(410).json({
                ok: false,
                err: {
                    message: 'Empresa no encontrado'
                }
            });
        }

        res.json({
            ok: true,
            Empresa: EmpresaBorrado
        });




    });
});

module.exports = app;