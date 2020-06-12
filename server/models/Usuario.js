const mongoose = require('mongoose'); // importamos la dependencia mongosse debido a que vamos a utilizar uno de sus métodos

//Definir los campos de la coleccion o tabla de usuarios
const UsuariosSchema = mongoose.Schema({
    nombre:{
        type: String,
        required: true,
        trim: true //para que mopngoDB elimine los espacio al inicio y al final del string enviado
    },
    email:{
        type: String,
        required: true,
        trim: true, //para que mopngoDB elimine los espacio al inicio y al final del string enviado
        unique: true // unique te permite que no exista el mismo string en la coleccion de la base de datos
    },
    password:{
        type: String,
        required: true,
        trim: true //para que mopngoDB elimine los espacio al inicio y al final del string enviado
    },
    registro:{
        type: Date,
        default: Date.now() //registrar la fecha en que se hace el registro
    }
});

module.exports = mongoose.model('Usuario', UsuariosSchema);