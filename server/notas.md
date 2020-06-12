# Dependencias instaladas
__nodemon__.- permite reiniciar el servidor cada que se guarda un cambio
__express__.- te perite crear tu servidor con nodejs
__mongosse__.- te permite hacer operaciones CRUD a la bse de datos de mongoDB
__dotenv__.- te permite crear un archivo donde se declaran las variables de entorno tanto para desarrollo como producción
__bcryptjs__.- para hashear passwords
__express-validator__.- para validar información y personalizar mensajes de error
__jsonwebtoken__.- es la manera de autenticar un usuario debido a que en React no hay manera de generar autentificaciones, te permite definir rutas a las que un usuario puede acceder.

# Software instalado
__MongoDB Compass__
__Mongo Altlas__ __opcional, ya que se puede creando una cuenta__
__Postman__.- enviar peticiones tipo REST y ver la respuesta o error generado

# scripts
```` javascript
"scripts": {
    "start": "node .", // el punto se coloca para indicar que busque el archivo index.js de la raiz del proyecto o servidor
    "start": "node ./index.js", // otra forma de referenciarlo con el nombre específico
    "dev": "nodemon ." // el punto se coloca para indicar que busque el archivo index.js de la raiz del proyecto o servidor
  }
````

# Crear el servidor archivo index.js raiz
__Archivo index.js__
````javascript
const express = require('express'); // importamos la dependencia express para crear el servidor de nodejs
const conectarDB = require('./config/db'); //importamos la configuración de la base de datos


// Crear el servidor
const app = express();

// Conectar a la base de datos
conectarDB(); // importamos la función creada en el archivo de configuración de la base de datos 

// Habilitar express.json, permite leer datos que el usuario ingrese en un formulario
//si utilizamos postman, hay que definir en Headers / key: content-type & value:application/json
// tambien es necesario, en la parte de body / raw escribir un json con los campos que se quieren mandar
app.use(express.json({extended:true}));

// crear un puerto de la app
// SIEMPRE LA VARIABLE DEL PUERTO DEBE LLAMARSE PORT
// el puerto debe de ser distinto al del cliente, en este caso frontend o cliente es 3000 , por lo tanto el servidor va conectarse al puerto disponible o al puerto 4000
const PORT = process.env.PORT || 4000;

// importar rutas
app.use('/api/usuarios', require('./routes/usuarios')); //importamos la ruta URL del archivo "routes/usuarios"
app.use('/api/auth', require('./routes/auth')); //importamos la ruta URL del archivo "routes/auth"


// arrancar la app
app.listen(PORT, () =>{
    console.log(`El servidor esta funcionandoen el puerto ${PORT}`);
});
````

# MongoDB
1.- __Crear cuenta en mongoDB Atlas__ o instalar mongo localmente en tu computadora
*** La version gratuita te permite crear un cluster y una sola base de datos de hasta 512MB
+ Crear un clusters
+ Crear un usuario
    * Security / database Access / Crear usuario como administrador


2.- __Instalar MongoDb Compass localmente__, te permite conectarse al servidor de la base de datos de mongo y visualizar los datos de manera más amigable que con la consola
+ Conectar base de datos.- 
    * MondoDB Atlas.- presionar conect / conectar aplicacion / copiar el código
    * Archivo variables.env .- ```` DB_MONGO = mongodb+srv://smartzapps:Victoria13043@mern-umkq6.mongodb.net/merntasks```` el ultimo parametro del link es el nombre de la base de datos  
+ Una vez conectado al servidor de mongoDB, creamos la base de datos CREATED DATABASE __con el mismo nombre que tiene en el archivo de la variable de entorno__, y a su vez creamos una colleccion o tabla

3.- __Configurar coneccioón entre mongoDB y la libreria mongosse__ para poder hacer operaciones CRUD
+ Crear carpeta "config" / crear archivo "db.js"

__Archivo "db.js"__
```` javascript
const mongoose = require('mongoose'); // importar la dependencia de la base de datos mongoDB
require('dotenv').config({path:'variables.env'}); // señalar la ruta e importarlo donde esta el archivo donde se declaran las variables de entorno

const conectarDB = async () =>{
    try{
        // los parametros son: 1.- a donde se va a conectar, 2.- los parametros de configuración
        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        console.log('DB conectada')

    } catch (error) {
        console.log(error)
        process.exit(1); // en caso de error en la conección detener la app
    }
}

module.exports = conectarDB 
````

+ Archivo "index.js", importar la configuración de la base de datos que hicimos en el archivo "config/db.js"


# Routes

+ 1.- Importamos la ruta en el archivo "index.js"

+ 2.- Crear carpeta "routes" / crear archivo "usuarios", "auth", etc; todas las rutas del proyecto

__Archivo usuarios__
````javascript
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
````

2.1.- Creamos la carpeta "controllers/usuarioController.js", para definir las funciones del endpoint del archivo usuarios

__Archivo: usuarioController.js__
````javascript
const Usuario = require('../models/Usuario');// importamos el archivo donde se definieron los campos que involucra el dar de alta un usuario
const bcryptjs = require('bcryptjs'); // importamos dependencia para hashear el password
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
    


    try{
        // Revisar que el usuario registrado sea unico
        let usuario = await Usuario.findOne({email});

        if(usuario){
            return res.status(400).json({msg: 'El usuario ya existe'});
        }

        // crear una instancia de usuario con los campos definidos en el archivo model/usuario
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

````

# Models

+ Creamos la carpeta "Models" / creamos el archivo "usuario.js" para definir los campos de la coleccion o tabla de "usuarios"

__Archivo:"models/usuario.js"__

```` javascript
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

````

# JsonWebToken

+ Instalar la dependencia
+ definir una palabra secreta en el archivo "variables.env"
__Archivo variables.env__
````javascript

DB_MONGO = mongodb+srv://smartzapps:Victoria13043@mern-umkq6.mongodb.net/merntasks

SECRETA=palabraSecreta // jsonwebtoken, sería como la firma del jwt
````
*** es importante que la palabra secreta sea la misma tanto para crear el usuario como para autentificarlo