const mongooose = require('mongoose');
const Schema = mongooose.Schema;

let sectorShema = new Schema({
    nombre: { type: String, required: [true, 'El nombre es necesario'] }
}, { collection: 'sectores' });

module.exports = mongooose.model('Sector', sectorShema);