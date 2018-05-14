const mongooose = require('mongoose');
const Schema = mongooose.Schema;

let empresaShema = new Schema({
    nombre: { type: String, required: [true, 'El nombre es necesario'] },
    img: { type: String, required: false },
    descripcion: { type: String, required: [true, 'La descripcion es necesaria'] },
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' },
    ubicacion: { type: Schema.Types.ObjectId, ref: 'Departamento' },
    sector: { type: Schema.Types.ObjectId, ref: 'Sector' }
}, { collection: 'empresas' });

module.exports = mongooose.model('Empresa', empresaShema);