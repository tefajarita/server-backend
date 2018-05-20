const mongooose = require('mongoose');
const Schema = mongooose.Schema;

let contratacion = {
    values: ['contratación inmediata', 'contratación mediano plazo'],
    message: '{VALUE} no es valida el tipo de contratación'
};

let tipoContrato = {
    values: ['FULL TIME', 'PART TIME', 'FREELANCE', 'ENTERNSHIP'],
    message: '{VALUE} no es un rol permitido'
};

let ofertaShema = new Schema({
    titulo: { type: String, required: [true, 'El titulo de la oferta es necesario'] },
    contratacion: { type: String, required: true, default: 'contratación inmediata', enum: contratacion },
    descripcion: { type: String, required: [true, 'La descripcion es necesaria'] },
    aniosexperiencia: { type: Number, default: 0, required: [true, 'Experiencia es necesaria'] },
    salario: { type: String, required: [true, 'Salario es necesario'] },
    horario: { type: String, required: [true, 'El horario es necesario'] },
    tipoContrato: { type: String, default: 'FULL TIME', enum: tipoContrato },
    fechaContrato: { type: Date, required: true },
    ocupacion: { type: Schema.Types.ObjectId, ref: 'Ocupacion', required: true },
    activada: { type: Boolean, default: true },
    LugarTrabajo: { type: String, required },
    empresa: { type: Schema.Types.ObjectId, ref: 'Empresa' }
}, { collection: 'ofertas' });

module.exports = mongooose.model('Oferta', ofertaShema);