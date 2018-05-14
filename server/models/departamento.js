const mongooose = require('mongoose');
const Schema = mongooose.Schema;

let departamentoShema = new Schema({
    nombre: { type: String, required: [true, 'El nombre es necesario'] },
    ciudad: { type: Schema.Types.ObjectId, ref: 'Ciudad' },
}, { collection: 'departamentos' });

module.exports = mongooose.model('Empresa', departamentoShema);