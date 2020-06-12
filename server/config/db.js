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