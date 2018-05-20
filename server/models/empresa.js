const mongooose = require('mongoose');
const Schema = mongooose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
let empresaShema = new Schema({
    ein: { type: String, unique: true, required: [true, 'El número de identificación debe ser único'] },
    nombre: { type: String, required: [true, 'El nombre es necesario'] },
    img: { type: String, required: false },
    descripcion: { type: String, required: [true, 'La descripcion es necesaria'] },
    email: { type: String, required: [true, 'La email es necesaria'] },
    paginaWeb: { type: String, required: false },
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
    direccion: { type: String, required: [true, ' Ingrese la ubicación de la empresa'] },
    ciudad: { type: Schema.Types.ObjectId, ref: 'Sector', required: [true, ' Es requerido el campo de la ciudad'] },
    lat: { type: Number, require: true },
    log: { type: Number, require: true },
    sector: { type: Schema.Types.ObjectId, ref: 'Sector', required: [true, 'Es requere la industria de la empresa'] }
}, { collection: 'empresas' });

empresaShema.plugin(uniqueValidator, { message: '{PATH} debe de ser único' })
module.exports = mongooose.model('Empresa', empresaShema);