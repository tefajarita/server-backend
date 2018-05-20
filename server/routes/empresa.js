//Requires
const express = require('express');
const NodeGeocoder = require('node-geocoder');
//const jwt = require('jsonwebtoken');
//Validaciones addicionales

//Inicializar variables
var app = express();
//importacion del modelo 
var Empresa = require('../models/empresa');
var Ciudad = require('../models/ciudad');
//opciones para obtener la localizacion del cliente

let options = {
    provider: 'google',
    httpAdapter: 'https',
    apiKey: 'AIzaSyCGfZcDBLgzEQRgeO68Mr3euM2lz_1w9gg',
    formatter: null
}

let geocoder = NodeGeocoder(options);
//middlewares
const { verificaToken, verificarAdminRole, verificarEmpresaRole } = require('../middlewares/autenticacion');
//Rutas 

//==========================
//Obtener todos los Empresas||
//==========================
app.get('/', (req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);
    let estado = true;
    let limite = req.query.limite || 5;
    limite = Number(limite);
    Empresa.find({ estado: true }, )
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

// ==========================================
//  Obtener Empresa por ID
// ==========================================
app.get('/:id', (req, res) => {

    var id = req.params.id;

    Hospital.findById(id)
        .populate('usuario', 'nombre img email')
        .exec((err, empresa) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al buscar empresa',
                    errors: err
                });
            }

            if (!empresa) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'la empresa con el id ' + id + 'no existe',
                    errors: { message: 'No existe un empresa con ese ID' }
                });
            }
            res.status(200).json({
                ok: true,
                empresa: empresa
            });
        })
})


//==========================
//Crear Empresa             ||
//==========================

app.post('/', [verificaToken], (req, res) => {

    var body = req.body;

    var empresa = new Empresa({
        nombre: body.nombre,
        img: body.img,
        descripcion: body.descripcion,
        usuario: req.usuario.Usuario._id,
        direccion: body.direccion,
        ciudad: body.ciudad,
        sector: body.sector,
        lat: body.lat,
        log: body.log
    });
    let direccion = body.direccion;
    let ciudad;

    console.log(req.usuario.Usuario._id);

    Ciudad.findById(body.ciudad, (err, ciudadDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                message: 'La ciudad no existe',
                err
            });
        }
        ciudad = ciudadDB.ciudad;
        //Obtengo las cordenadas dependiendo de la dirreción 
        geocoder.geocode(direccion + ' ' + ciudad)
            .then(function(respuesta) {
                empresa.lat = respuesta[0].latitude;
                empresa.log = respuesta[0].longitude;
                empresa.save((err, empresaGuardado) => {

                    if (err) {
                        return res.status(400).json({
                            ok: false,
                            mensaje: 'Error al crear empresa',
                            errors: err
                        });
                    }

                    res.status(201).json({
                        ok: true,
                        empresa: empresaGuardado
                    });


                });

            })
            .catch(function(err) {
                return res.status(404).json({
                    ok: false,
                    mensaje: 'No se encuentran las coordenadas de la dirección',
                    errors: err
                });
            });


    });





});


//==========================
//Actualizar Empresa             ||
//==========================


app.put('/:id', [verificaToken, verificarEmpresaRole], (req, res) => {
    let id = req.params.id;
    let usuario = req.usuario._id;
    let ubicacion = req.ubicaion._id;
    let lat = req.lat;
    let log = req.log;
    let sector = req.sector._id;
    let body = _.pick(req.body,
        'nombre',
        'descripcion',
        'img'
    );

    Empresa.findByIdAndUpdate(id, usuario, ubicacion, lat, log, sector, body, { new: true, runValidators: true }, (err, EmpresaDB) => {
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


app.delete('/:id', [verificaToken, verificarAdminRole], function(req, res) {

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