const Usuario = require('../models/Usuario');// importamos el archivo donde se definieron los campos que involucra el dar de alta un usuario
const bcryptjs = require('bcryptjs'); // importar dependencia para hasear password
const { validationResult } = require('express-validator'); // importamos la función validationResult de la dependencia express-validator
const jwt = require('jsonwebtoken'); // importamos la dependencia jsonwebtoken para crear sessiones en las que el usuario este autentificado

//Definir las funciones relacionadas a usuarios
exports.crearUsuario = async (req, res) => {

    // Revisar si hay errores de la función validationResult
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }

    // Extraer email y password
    const {email, password} = req.body
    

    // siempre es recomendable utilizar try / catch para revisar la respuesta o error
    try{
        // Revisar que el usuario registrado sea unico

        let usuario = await Usuario.findOne({email});

        if(usuario){
            return res.status(400).json({msg: 'El usuario ya existe'});
        }

        // crear instancia de usuario con los campos definidos en el archivo model/usuario
        usuario = new Usuario(req.body);

        // Hashear el password
          // salt es el nombre de la variable para hashera el password, el numero de genSalt() es para definir el grado de hasheo  
        const salt = await bcryptjs.genSalt(10);
        //reescribimos el password con el hash generado
         //toma como parametro el password que el usuario escribio y el otro parametro el nivel de hasheo definido en la variable salt
        usuario.password = await bcryptjs.hash(password, salt);

        // guardar usuario
        await usuario.save();

        //crear y firmar el jsonwebtoken
        //el usuario viene del usuario que acabamos e guardar
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
        console.log(error);
        res.status(400).send('Hubo un error');
    }
}