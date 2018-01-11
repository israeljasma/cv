const express = require('express');
const app = express();
const port = process.env.PORT || 80

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// realizando conexion con la bd
mongoose.connect('mongodb://localhost/pruebas', { useMongoClient: true });

var contenidoSchemaJSON = {
    titulo: String,
    contenido: String
};

// Creando Schema
var contenidoSchema = new Schema(contenidoSchemaJSON);

// Creando modelo
var Contenido = mongoose.model("prueba01",contenidoSchema);

app.get("/list",(req,res) => {
	Contenido.find((err, result) => {
		console.log(result);
		res.send(result);
	});
});



var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'macdato13',
    database: 'test'
});

connection.connect(function (err) {
    if (!err) {
        console.log("Database is connected ... \n\n");
    } else {
        console.log("Error connecting database ... \n\n");
    }
});

app.get("/bd",function(req,res){
    connection.query('SELECT * from user', function(err, rows, fields) {
    connection.end();
      if (!err){
        console.log('The solution is: ', rows),
        res.send(rows);
     }else
        console.log('Error while performing Query.');
      });
    });

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/cv', (req, res) => res.send('Hello World!'));

app.get('/hola', (req, res) => res.send('salu2!!'));

app.get('/contacto', (req, res) => res.json({ nombre: "israel jasma", rut: "18.781.602.5" }))

app.use(express.static('assets'));
app.get('/', (req, res) => res.sendFile(__dirname + '/assets/index.html'));

app.listen('80',() =>{
    console.log('Servidor iniciado en el puerto 80');
});
