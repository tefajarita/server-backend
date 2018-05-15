const mongooose = require('mongoose');
const Schema = mongooose.Schema;

let contratacion = {
    values: ['contratación inmediata', 'contratación mediano plazo'],
    message: '{VALUE} no es valida el tipo de contratación'
};

let ofertaShema = new Schema({
    titulo: { type: String, required: [true, 'El titulo de la oferta es necesario'] },
    contratacion: { type: String, required: true, default: 'contratación inmediata', enum: contratacion },
    descripcion: { type: String, required: [true, 'La descripcion es necesaria'] },
    funciones: { type: String, required: [true, 'Funciones son necesaria'] },
    experiencia: { type: String, required: [true, 'Experiencia es necesaria'] },
    salario: { type: Number, required: [true, 'Salario es necesario'] },
    horario: { type: String, required: [true, 'El horario es necesario'] },
    tipoContrato: { type: String, default: 'Obra Labor' },
    fechaContrato: { type: Date, required: true },
    cantidadVacantes: { type: Number, required: [true, 'Es necesario el número de vacantes'] },
    educacionMinima: { type: String, default: 'Educación primaria', required: false },
    aniosExpercia: { type: Number, required: false },
    edad: { type: String, required: false },
    disponibilidadViajar: { type: Boolean, default: false },
    disponibilidadCambioResidencia: { type: Boolean, required: false, default: false },
    activada: { type: Boolean, default: true },
    LugarTrabajo: { type: Schema.Types.ObjectId, ref: 'Departamento' },
    empresa: { type: Schema.Types.ObjectId, ref: 'Empresa' }
}, { collection: 'ofertas' });

module.exports = mongooose.model('Oferta', ofertaShema);