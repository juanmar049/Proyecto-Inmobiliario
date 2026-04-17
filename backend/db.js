const mysql = require('mysql2');

const conexion = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '', 
    database: 'inmobiliaria',
    port: 3307
});

conexion.connect(err => {
    if (err) {
        console.error('Error conexión:', err);
    } else {
        console.log('Conectado a MySQL');
    }
});

module.exports = conexion;