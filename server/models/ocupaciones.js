const mongooose = require('mongoose');
const Schema = mongooose.Schema;

let ocupacionShema = new Schema({
    nombre: { type: String, required: [true, 'El nombre es necesario'] }
}, { collection: 'ocupaciones' });

module.exports = mongooose.model('Ocupacion', ocupacionShema);