const express = require('express');
const router = express.Router();
const conexion = require('../db');

router.get('/', (req, res) => {
    conexion.query(`
        SELECT p.*, t.descripcion AS tipo
        FROM persona p
        INNER JOIN tipopersona t 
        ON p.idTipoPersona = t.idTipoPersona
    `, (err, result) => {
        if (err) return res.json(err);
        res.json(result);
    });
});


router.post('/', (req, res) => {
    const { idTipoPersona, nombre, apellido, fechaNacimiento, domicilio, telefono, correo } = req.body;

    conexion.query(`
        INSERT INTO persona 
        (idTipoPersona, nombre, apellido, fechaNacimiento, domicilio, telefono, correo)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
    [idTipoPersona, nombre, apellido, fechaNacimiento, domicilio, telefono, correo],
    (err) => {
        if (err) return res.json(err);
        res.json({ mensaje: "Persona creada" });
    });
});
router.put('/:id', (req, res) => {
    const { idTipoPersona, nombre, apellido, fechaNacimiento, domicilio, telefono, correo } = req.body;

    conexion.query(`
        UPDATE persona SET 
        idTipoPersona=?, nombre=?, apellido=?, fechaNacimiento=?, domicilio=?, telefono=?, correo=?
        WHERE idPersona=?
    `,
    [idTipoPersona, nombre, apellido, fechaNacimiento, domicilio, telefono, correo, req.params.id],
    (err) => {
        if (err) return res.json(err);
        res.json({ mensaje: "Actualizado" });
    });
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;

    conexion.query('DELETE FROM empleado WHERE idPersona=?', [id]);
    conexion.query('DELETE FROM cliente WHERE idPersona=?', [id]);
    conexion.query('DELETE FROM propietario WHERE idPersona=?', [id]);

    conexion.query('DELETE FROM persona WHERE idPersona=?', [id], (err) => {
        if (err) return res.json(err);
        res.json({ mensaje: "Eliminado correctamente" });
    });
});


module.exports = router;