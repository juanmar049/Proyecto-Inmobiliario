const express = require('express');
const router = express.Router();
const conexion = require('../db');


router.get('/', (req, res) => {
    conexion.query('SELECT * FROM tipopersona', (err, result) => {
        if (err) return res.json({ error: err });
        res.json(result);
    });
});


router.post('/', (req, res) => {
    const { descripcion, tipoEntidad } = req.body;

    const sql = 'INSERT INTO tipopersona (descripcion, tipoEntidad) VALUES (?, ?)';

    conexion.query(sql, [descripcion, tipoEntidad], (err, result) => {
        if (err) return res.json({ error: err });
        res.json({ mensaje: 'TipoPersona creado' });
    });
});


router.put('/:id', (req, res) => {
    const { descripcion, tipoEntidad } = req.body;

    const sql = 'UPDATE tipopersona SET descripcion=?, tipoEntidad=? WHERE idTipoPersona=?';

    conexion.query(sql, [descripcion, tipoEntidad, req.params.id], (err) => {
        if (err) return res.json({ error: err });
        res.json({ mensaje: 'Actualizado' });
    });
});


router.delete('/:id', (req, res) => {
    conexion.query('DELETE FROM tipopersona WHERE idTipoPersona=?', [req.params.id], (err) => {
        if (err) return res.json({ error: err });
        res.json({ mensaje: 'Eliminado' });
    });
});

module.exports = router;