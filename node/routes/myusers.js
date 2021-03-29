var express = require('express');
var router = express.Router();
var  dbtool = require('./dbtool'); 
var server = require('../app');

const Joi = require('joi')
            .extend(require('@joi/date'));



const schema = Joi.object().keys({

    user:Joi.string().email().required() ,
    passwd:Joi.string().max(10).required(),
    firsname: Joi.string().max(255).required(),
    lastname: Joi.string().max(255).required()  ,
    role: Joi.string().valid('admin','user').required()  ,
    
})




// middleware sample
/*
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});
*/






////////////////////////////////////////////////////////////////////////////////////////////
//method GET...
router.get('/', function(req, res, next) {  

    var conn = undefined ;
    var query = "SELECT * FROM prod.users" ;
    var p = [] ;
    
    
    dbtool.connect(server.pool).then(con => {
        conn = con;
        return dbtool.doQuery(conn, query, p );
     }).then(result => {
        conn.release();
        conn = undefined ;
        return res.json( result )	;
    }).catch(error => {
      if (conn) {
        conn.release();
      }
        return next( error );
      
     });
    
    })
////////////////////////////////////////////////////////////////////////////////////////////
//method get...
router.get('/:id', function(req, res, next) {  
var id = req.params.id ;
if( ! id.match("^[0-9]+$") )   {
  var e = new Error("id must be an integer");
  e.status = 400 ;
  throw ( e );
}
var conn = undefined ;
var query = "SELECT * FROM prod.users WHERE id = ?" ;
var p = [id] ;


dbtool.connect(server.pool).then(con => {
    conn = con;
    return dbtool.doQuery(conn, query, p );
 }).then(result => {
    conn.release();
    conn = undefined ;
    return res.json( result[0] )	;
}).catch(error => {
  if (conn) {
    conn.release();
  }
    return next( error );
  
 });

})

////////////////////////////////////////////////////////////////////////////////////////////
//method post...
router.post( '/', function(req, res, next) {  

  var datas = req.body ;
  var result = schema.validate( datas );
  if (result.error) {
      return res.status(400).json({ error: result.error.details[0].message });
    }
  result = undefined ; 

  var conn = undefined ;
  var query ="INSERT INTO prod.users SET ?" ;
  var p = [ datas ] ;
  
  
  dbtool.connect(server.pool).then(con => {
      conn = con;
      return dbtool.doQuery(conn, query, p );
   }).then(result => {
      conn.release();
      conn = undefined ;
      return res.json( result )	;
  }).catch(error => {
    if (conn) {
      conn.release();
    }
      return next( error );
    
   });
  
  })
    ////////////////////////////////////////////////////////////////////////////////////////////
//method post...
router.put( '/:id', function(req, res, next) {  
  var id = req.params.id ;
  
  if( ! id.match("^[0-9]+$") )   {
    var e = new Error("id must be an integer");
    e.status = 400 ;
    throw ( e );
  }
 
  var datas = req.body ;
  var result = schema.validate( datas );
  if (result.error) {
      return res.status(400).json({ error: result.error.details[0].message });
    }
  result = undefined ; 
  var conn = undefined ;
  var query = "UPDATE prod.users SET ? WHERE ? " ;
  var p = [ datas , id ] ;
   
  dbtool.connect(server.pool).then(con => {
      conn = con;
      return dbtool.doQuery(conn, query, p );
   }).then(result => {
      conn.release();
      conn = undefined ;
      return res.json( result )	;
  }).catch(error => {
    if (conn) {
      conn.release();
    }
      return next( error );
    
   });
  
  })

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////












module.exports = router;
