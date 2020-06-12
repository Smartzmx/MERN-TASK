const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs'); // importamos dependencia para revisar que el password hasheado sea el mismo que el usuario esta ingresando 
const { validationResult } = require('express-validator'); // revisar los resultados de la validación a traves de la función validationResult
const jwt = require('jsonwebtoken'); // importamos jsonwebtoken para generar una sesion segura donde el usuario este autentificado

exports.autenticarUsuario = async (req, res) => {

    // Revisar si hay errores generados en la dependencia express-validator
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }

    // extraer email y password de la petición que el usuario esta enviando a traves de un formaulario
    const {email, password} = req.body;

    try{
        // Revisar que sea un usuario registrado, para lo cual importe el archivo de model/usuario donde a traves de éste puede accder a consultar si existe o no el usuario
        let usuario = await Usuario.findOne({email});
        if(!usuario){
            return res.status(400).json({msg:'El usuario no existe'})
        }

        //Revisar el password
        //Utilizamos la función compare para comparar el password de la dependencia bcryptjs
        const passCorrecto = await bcryptjs.compare(password, usuario.password);
        if(!passCorrecto){
            return res.status(400).json({msg:'Password incorrecto'})
        }

        //Si to es correcto, creamos y firmamos el jsonwebtoken
         const payload = {
            usuario:{
                id: usuario.id
            }
        }

        // firmar el jsonwebtoken
        jwt.sign(payload, process.env.SECRETA,{
            expiresIn:3600 // tiempo en que el usuario estará autenticado, en este caso 1 hora
        }, (error, token) =>{
            if(error) throw error;
            
            // Mensaje de confirmación
            res.json({token});        

        })


    } catch(error){
        console.log(error)
    }

}