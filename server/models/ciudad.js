const mongooose = require('mongoose');
const Schema = mongooose.Schema;

let ciudadShema = new Schema({
    ciudad: { type: String, required: [true, 'El nombre es necesario'] },
    estado: { type: String, required: [true, 'El nombre es necesario'] },
}, { collection: 'ciudades' });

module.exports = mongooose.model('Ciudad', ciudadShema);