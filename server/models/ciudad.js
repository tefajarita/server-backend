const mongooose = require('mongoose');
const Schema = mongooose.Schema;

let ciudadShema = new Schema({
    nombre: { type: String, required: [true, 'El nombre es necesario'] },
    departamento: { type: Schema.Types.ObjectId, ref: 'Departamento' },
}, { collection: 'ciudades' });

module.exports = mongooose.model('Ciudad', ciudadShema);