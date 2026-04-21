const express = require('express');
const router = express.Router();
const conexion = require('../db');


router.get('/', (req, res) => {
  conexion.query(`
    SELECT pr.idPropietario, pr.tipoPropiedad,
           p.idPersona, p.nombre, p.apellido
    FROM propietario pr
    JOIN persona p ON pr.idPersona = p.idPersona
  `, (err, result) => {
    if (err) {
      console.error(err);
      return res.json(err);
    }
    res.json(result);
  });
});


router.post('/', (req, res) => {
  const { idPersona, tipoPropiedad } = req.body;

  if (!idPersona || !tipoPropiedad) {
    return res.json({ error: "Complete todos los campos" });
  }

  conexion.query(
    'INSERT INTO propietario (idPersona, tipoPropiedad) VALUES (?, ?)',
    [idPersona, tipoPropiedad],
    (err) => {
      if (err) {
        console.error(err);
        return res.json(err);
      }
      res.json({ mensaje: 'Propietario creado' });
    }
  );
});


router.delete('/:id', (req, res) => {
  conexion.query(
    'DELETE FROM propietario WHERE idPropietario=?',
    [req.params.id],
    (err) => {
      if (err) return res.json(err);
      res.json({ mensaje: 'Eliminado' });
    }
  );
});

module.exports = router;