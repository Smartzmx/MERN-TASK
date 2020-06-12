// Rutas para crear usuarios
const express = require('express'); // importamos la dependencia express
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const { check } = require('express-validator'); // importamos la función check de la dependencia express-validator

// Crear un usuario

// endpoint.- api/ usuarios, hacia donde vamos a enviar esta información, en este caso es solo la / debido a que sería la URL raiz del proyecto
// los parameros de esta funci{on es URl y una callback, que estará definida en el archivo "usuarioController.js"
router.post('/', 
    [
        // definimos la reglas de validación y sus mensajes de error
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'Agrega un email valido').isEmail(),
        check('password', 'El password debe de contener al menos 6 caracteres').isLength({min: 6})
    ],
    usuarioController.crearUsuario
);

module.exports = router;