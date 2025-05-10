const express = require("express");
const morgan = require("morgan");
const cors = require('cors');
const fs = require('fs');
const path = require('path');



const FILE_PATH = path.join(__dirname, 'usuarios.json');

//funciones

//lectura de archivo json
function leerJsonDB (){
    try {
        const data = fs.readFileSync(FILE_PATH,'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error en leerJsonDB(): ', error);
        return [];
    }
}

function guardarUsuario(usuarios){
    fs.writeFileSync(FILE_PATH, JSON.stringify(usuarios, null, 2), 'utf8');
}

const app = express()

app.use(express.json());
app.use(morgan('dev'));

app.use(cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type']
}))

app.get('/usuarios', (req, res) => {

    const usuarios = leerJsonDB();

    res.status(200).json(usuarios)

})

app.post('/usuarios', (req, res) => {
    const nuevoUsuario = req.body;

    if(!nuevoUsuario.nombre || !nuevoUsuario.email || !nuevoUsuario.edad){
        return res.status(500).json({
            respuesta:'error',
            mensaje: 'Datos incompletos'
        })
    }

    try {

        const usuarios = leerJsonDB();
        usuarios.push({ id: Date.now(), ...nuevoUsuario });
        guardarUsuario(usuarios);

        //confirma ejecucion
        res.status(200).json({
            respuesta:'success',
            mensaje:'Agregado'
        })

    } catch (error) {
        //envio de error
       
        res.status(500).json({
            respuesta:'error catch',
            mensaje: error
        })
    }
})

function initServer() {
    try {
        app.listen(3000, () => {
            console.log('Servidor en puerdo 3000')
        })

    } catch (error) {
        console.error("Fallo: ". error)
    }
}

initServer()