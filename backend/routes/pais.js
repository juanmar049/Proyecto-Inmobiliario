const express = require('express');
const router = express.Router();
const conexion = require('../db');

router.get('/', (req,res)=>{
  conexion.query('SELECT * FROM pais',(err,result)=>{
    if(err) return res.json(err);
    res.json(result);
  });
});


router.post('/', (req,res)=>{
  conexion.query(
    'INSERT INTO pais(nombre) VALUES(?)',
    [req.body.nombre],
    err=>{
      if(err) return res.json(err);
      res.json({mensaje:"País creado"});
    }
  );
});


router.put('/:id', (req,res)=>{
  conexion.query(
    'UPDATE pais SET nombre=? WHERE idPais=?',
    [req.body.nombre, req.params.id],
    err=>{
      if(err) return res.json(err);
      res.json({mensaje:"Actualizado"});
    }
  );
});


router.delete('/:id',(req,res)=>{
  conexion.query(
    'DELETE FROM pais WHERE idPais=?',
    [req.params.id],
    err=>{
      if(err) return res.json(err);
      res.json({mensaje:"Eliminado"});
    }
  );
});

module.exports = router;