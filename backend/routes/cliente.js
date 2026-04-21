const express = require('express');
const router = express.Router();
const conexion = require('../db');


router.get('/', (req, res) => {
  conexion.query(`
    SELECT c.idCliente, c.tipoCliente,
           p.idPersona, p.nombre, p.apellido
    FROM cliente c
    JOIN persona p ON c.idPersona = p.idPersona
  `, (err, result) => {
    if (err) {
      console.error(err);
      return res.json(err);
    }
    res.json(result);
  });
});


router.post('/', (req, res) => {
  const { idPersona, tipoCliente } = req.body;

  if (!idPersona || !tipoCliente) {
    return res.json({ error: "Complete todos los campos" });
  }

  conexion.query(
    'INSERT INTO cliente (idPersona, tipoCliente) VALUES (?, ?)',
    [idPersona, tipoCliente],
    (err) => {
      if (err) {
        console.error(err);
        return res.json(err);
      }
      res.json({ mensaje: 'Cliente creado' });
    }
  );
});


router.delete('/:id', (req, res) => {
  conexion.query(
    'DELETE FROM cliente WHERE idCliente=?',
    [req.params.id],
    (err) => {
      if (err) return res.json(err);
      res.json({ mensaje: 'Eliminado' });
    }
  );
});

module.exports = router;