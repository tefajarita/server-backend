var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var usuarioSchema = new Schema({
    nombre: { type: String, require: [true, 'El nombre es necesario'] },
    email: { type: String, unique: true, require: [true, 'El nombre es necesario'] },
    password: { type: String, require: [true, 'La contraseña es necesario'] },
    img: { type: String, require: false },
    role: { type: String, require: true, default: 'USER_ROLE' }
});
//Ingreso login se coloca path para el mensaje se dinamico
usuarioSchema.plugin(uniqueValidator, { message: 'El correo debe de ser único' })


module.exports = mongoose.model('Usuario', usuarioSchema);