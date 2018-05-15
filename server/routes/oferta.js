//Requires
var express = require('express');
var bcrypt = require('bcryptjs');

//Validaciones addicionales

const _ = require('underscore');
//Inicializar variables
const app = express();
//importacion del modelo 
let Oferta = require('../models/ofertaempleo');

//middlewares
const { verificaToken, verificarEmpresaRole } = require('../middlewares/autenticacion');
//Rutas 

//==========================
//Obtener todas las ofertas||
//==========================
app.get('/', verificaToken, (req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);
    let activada = true;
    let limite = req.query.limite || 5;
    limite = Number(limite);
    Oferta.find({ activada: true }, 'titulo contratacion descripcion funciones experiencia ')
        .skip(desde)
        .limit(5)
        .exec(
            (err, ofertas) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando ofertas de empleo',
                        errors: err
                    });
                }

                Usuario.count({ estado: true }, (err, conteo) => {
                    return res.status(200).json({
                        ok: true,
                        ofertas,
                        cuantos: conteo
                    });
                });


            })



});

//==========================
//Crear oferta             ||
//==========================

app.post('/', [verificaToken, verificarEmpresaRole], (req, res) => {

    let body = req.body;
    let oferta = new Usuario({
        titulo: body.titulo,
        contratacion: body.contratacion,
        descripcion: body.descripcion,
        funciones: body.funciones,
        experiencia: body.experiencia,
        salario: body.salario,
        horario: body.horario,
        tipoContrato: body.tipoContrato,
        fechaContrato: body.fechaContrato,
        cantidadVacantes: body.cantidadVacantes,
        educacionMinima: body.educacionMinima,
        aniosExpercia: body.aniosExpercia,
        edad: body.edad,
        disponibilidadViajar: body.disponibilidadViajar,
        disponibilidadCambioResidencia: body.disponibilidadCambioResidencia,
        activada: body.activada,
        LugarTrabajo: body.LugarTrabajo,
        empresa: body.empresa
    });

    oferta.save((err, ofertaGuardado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear oferta',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            oferta: ofertaGuardado
        });

    });

});


//==========================
//Actualizar oferta             ||
//==========================


app.put('/:id', [verificaToken, verificarEmpresaRole], (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body,
        'contratacion',
        'descripcion',
        'funciones',
        'experiencia',
        'salario',
        'horario',
        'tipoContrato',
        'fechaContrato',
        'cantidadVacantes',
        'educacionMinima',
        'aniosExpercia',
        'edad',
        'disponibilidadViajar',
        'disponibilidadCambioResidencia'
    );

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, ofertaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            oferta: ofertaDB
        });
    })

});



//==========================
//Eliminar usuario   existen dos maneras de borrar registros, pero por integridad de los datos se activa          ||
//==========================


app.delete('/:id', [verificaToken, verificarEmpresaRole], function(req, res) {

    let id = req.params.id;
    /*let cambiaEstado = {
        activada: false
    };*/
    //Usuario.findByIdAndRemove(id,(err,UsuarioBorrado))
    Oferta.findByIdAndRemove(id, (err, ofertaBorrada) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!ofertaBorrada) {
            return res.status(410).json({
                ok: false,
                err: {
                    message: 'Oferta no encontrada'
                }
            });
        }

        res.json({
            ok: true,
            oferta: ofertaBorrada
        });




    });
});

module.exports = app;