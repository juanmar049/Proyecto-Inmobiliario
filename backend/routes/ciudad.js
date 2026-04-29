const express = require('express');
const router = express.Router();
const conexion = require('../db');

router.get('/', (req,res)=>{
  conexion.query('SELECT * FROM ciudad',(err,result)=>{
    if(err) return res.json(err);
    res.json(result);
  });
});

router.post('/', (req,res)=>{
  conexion.query(
    'INSERT INTO ciudad(idDepartamento,nombre) VALUES(?,?)',
    [req.body.idDepartamento, req.body.nombre],
    err=>{
      if(err) return res.json(err);
      res.json({mensaje:"Ciudad creada"});
    }
  );
});

router.put('/:id', (req,res)=>{
  const { idDepartamento, nombre } = req.body;

  conexion.query(
    'UPDATE ciudad SET idDepartamento=?, nombre=? WHERE idCiudad=?',
    [idDepartamento, nombre, req.params.id],
    err=>{
      if(err) return res.json(err);
      res.json({mensaje:"Actualizado"});
    }
  );
});

router.delete('/:id',(req,res)=>{
  conexion.query(
    'DELETE FROM ciudad WHERE idCiudad=?',
    [req.params.id],
    err=>{
      if(err) return res.json(err);
      res.json({mensaje:"Eliminado"});
    }
  );
});

module.exports = router;