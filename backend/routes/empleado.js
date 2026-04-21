const express = require('express');
const router = express.Router();
const conexion = require('../db');


router.get('/', (req, res) => {
  conexion.query(`
    SELECT e.idEmpleado, e.cargo, e.salario,
           p.idPersona, p.nombre, p.apellido
    FROM empleado e
    JOIN persona p ON e.idPersona = p.idPersona
  `, (err, result) => {
    if (err) {
      console.error("ERROR:", err);
      return res.json(err);
    }
    res.json(result);
  });
});


router.post('/', (req, res) => {
  const { idPersona, cargo, salario } = req.body;

  if (!idPersona || !cargo || !salario) {
    return res.json({ error: "Complete todos los campos" });
  }

  conexion.query(
    'INSERT INTO empleado (idPersona, cargo, salario) VALUES (?, ?, ?)',
    [idPersona, cargo, salario],
    (err) => {
      if (err) {
        console.error("ERROR INSERT:", err);
        return res.json(err);
      }
      res.json({ mensaje: 'Empleado creado' });
    }
  );
});


router.delete('/:id', (req, res) => {
  conexion.query(
    'DELETE FROM empleado WHERE idEmpleado=?',
    [req.params.id],
    (err) => {
      if (err) return res.json(err);
      res.json({ mensaje: 'Eliminado' });
    }
  );
});

module.exports = router;