const express = require('express'); // importamos la dependencia express para crear el servidor de nodejs
const conectarDB = require('./config/db'); //importamos la configuración de la base de datos


// Crear el servidor
const app = express();

// Conectar a la base de datos
conectarDB(); // importamos la función creada en el archivo de configuración de la base de datos 

// Habilitar express.json, permite leer datos que el usuario ingrese en un formulario
// si utilizamos postman, hay que definir en Headers / key: content-type & value:application/json 
// tambien es necesario, en la parte de body / raw escribir un json con los campos que se quieren mandar
app.use(express.json({extended:true}));

// crear un puerto de la app
// SIEMPRE LA VARIABLE DEL PUERTO DEBE LLAMARSE PORT
// el puerto debe de ser distinto al del cliente, en este caso frontend o cliente es 3000 , por lo tanto el servidor va conectarse al puerto disponible o al puerto 4000
const PORT = process.env.PORT || 4000;

// definimos e importamos las rutas URL del proyecto
app.use('/api/usuarios', require('./routes/usuarios')); //importamos la ruta URL del archivo "routes/usuarios"
app.use('/api/auth', require('./routes/auth')); //importamos la ruta URL del archivo "routes/auth"

// arrancar la app
app.listen(PORT, () =>{
    console.log(`El servidor esta funcionandoen el puerto ${PORT}`);
});


