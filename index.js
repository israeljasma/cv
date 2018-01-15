const port = process.env.PORT || 80;
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// realizando conexion con la bd
mongoose.connect('mongodb://localhost/productos', { useMongoClient: true });

var productosSchemaJSON = {
    nombre: String,
    fabricante: String
};

// Creando Schema
var productosSchema = new Schema(productosSchemaJSON);

// Creando modelo
var Productos = mongoose.model("productos",productosSchema);

//Lista los productos
app.get("/list",(req,res) => {
	Productos.find((err, result) => {
		console.log(result);
		res.send(result);
	});
});

//Muestra los productos
app.get('/productos', (req, res) => {
	Productos.find({}, (err, productos) => {
        if(err) return res.status(500).send({message: 'Error al realizar peticion: ${err}'});
        //if(!test) return res.status(404).send({message: 'No existe'});

        res.status(200).send({productos});
        console.log(productos);
    });
});

// Muestra un producto especifico
app.get('/productos/:_id', (req, res) => {
    let productosId = req.params._id;

    Productos.findById(productosId, (err, producto) => {
    	if(err) return res.status(500).send({message: `Error al realizar peticion: ${err}`});
    	if(!productos) return res.status(400).send({message: 'El usuario no existe'});
    	res.status(200).send({productos : producto});
	console.log(producto);
    });
});

// Registrar un nuevo producto
app.post('/agregar', (req, res) => {
	console.log('POST /agregar');
	console.log(req.body);

	let productos = new Productos();
	productos.nombre = req.body.nombre;
	productos.fabricante = req.body.fabricante;

	productos.save((err, productosAGuardar) => {
		if(err) res.status(500).send({message: `Error al guardar en la base de datos: ${err} `});
		
		res.status(200).send({productos: productosAGuardar});
		//console.log(usuarioAGuardar);
	});
});

// Modificar un producto
app.put('/actualizar/:_id', (req, res) => {
    let productosId = req.params._id;
    let update = req.body;

    Productos.findByIdAndUpdate(productosId, update, (err, productosUpdate) => {
    	if(err) return res.status(500).send({message: `Error al actualizar el producto: ${err}`});

   	res.status(200).send({ Productos: productosUpdate });
	console.log(productosUpdate);
    });
});


//fd
// Eliminar un producto
app.delete('/eliminar/:_id', (req, res) => {
	let productosId = req.params._id; 
	Productos.findById(productosId, (err, productos) => {
		if(err) res.status(500).send({message: 'Error al borrar la cosa: ${err}'});
		
		productos.remove(err => {
			if(err) res.status(500).send({message: 'Error al borrar la cosa: ${err}'});
			res.status(200).send({message: 'La cosa fue eliminada con exito'});
		});
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
