const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;

//Defino los valores por el enum
let rolesValidos = {
    values: ['ADMIN_ROLE', 'CANDIDATE_ROLE', 'EMPLOYEER_ROLE'],
    message: '{VALUE} no es un rol permitido'
};
let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesaria']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El nombre es necesaria']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es necesaria']
    },
    google: {
        type: Boolean,
        required: false,
        default: false
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        required: true,
        default: 'CANDIDATE_ROLE',
        enum: rolesValidos
    },
    estado: {
        type: Boolean,
        required: false,
        default: true
    }
});

usuarioSchema.methods.toJSON = function() {
        let user = this;
        let userObject = user.toObject();
        delete userObject.password;

        return userObject;
    }
    //Ingreso login se coloca path para el mensaje se dinamico
usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único' })


module.exports = mongoose.model('Usuario', usuarioSchema);