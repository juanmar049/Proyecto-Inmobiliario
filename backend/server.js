const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use('/login', require('./routes/login'));
app.use('/tipopersona', require('./routes/tipoPersona'));
app.use('/persona', require('./routes/persona'));
app.use('/empleado', require('./routes/empleado'));
app.use('/cliente', require('./routes/cliente'));
app.use('/propietario', require('./routes/propietario'));

app.listen(3000, () => {
    console.log('Servidor corriendo en puerto 3000');
});