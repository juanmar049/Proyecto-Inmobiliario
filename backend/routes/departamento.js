const express = require('express');
const router = express.Router();
const conexion = require('../db');

router.get('/', (req,res)=>{
  conexion.query('SELECT * FROM departamento',(err,result)=>{
    if(err) return res.json(err);
    res.json(result);
  });
});

router.post('/', (req,res)=>{
  conexion.query(
    'INSERT INTO departamento(idPais,nombre) VALUES(?,?)',
    [req.body.idPais, req.body.nombre],
    err=>{
      if(err) return res.json(err);
      res.json({mensaje:"Departamento creado"});
    }
  );
});

router.put('/:id', (req,res)=>{
  const { idPais, nombre } = req.body;

  conexion.query(
    'UPDATE departamento SET idPais=?, nombre=? WHERE idDepartamento=?',
    [idPais, nombre, req.params.id],
    err=>{
      if(err) return res.json(err);
      res.json({mensaje:"Actualizado"});
    }
  );
});

router.delete('/:id',(req,res)=>{
  conexion.query(
    'DELETE FROM departamento WHERE idDepartamento=?',
    [req.params.id],
    err=>{
      if(err) return res.json(err);
      res.json({mensaje:"Eliminado"});
    }
  );
});

module.exports = router;