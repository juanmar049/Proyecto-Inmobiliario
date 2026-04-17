const express = require('express');
const router = express.Router();
const conexion = require('../db');

router.post('/', (req, res) => {
    const { usuario, clave } = req.body;

    const sql = `
        SELECT * FROM usuario 
        WHERE nombreUsuario = ? AND clave = ?
    `;

    conexion.query(sql, [usuario, clave], (err, result) => {
        if (err) return res.json({ error: "Error en consulta" });

        if (result.length > 0) {
            res.json({ mensaje: "Login correcto", usuario: result[0] });
        } else {
            res.json({ mensaje: "Usuario o contraseña incorrectos" });
        }
    });
});

module.exports = router;