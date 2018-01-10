const express = require('express');
const app = express();
const port = process.env.PORT || 80

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/hola', (req, res) => res.send('salu2!!'));

app.get('/contacto', (req, res) => res.json({ nombre: "israel jasma", rut: "18.781.602.5" }))

app.listen(port, () => console.log(`Example app listening on port ${port}!`));