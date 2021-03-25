var express = require('express');
var router = express.Router();
var  dbtool = require('./dbtool'); 
var server = require('../app');

const Joi = require('joi')
            .extend(require('@joi/date'));



const schema = Joi.object().keys({
    //username: Joi.string().alphanum().min(3).max(30).required()
    sexe :Joi.string().valid('F', 'M').required(),
    firstname:Joi.string().required() ,
    lastname:Joi.string().required()  ,
    discipline: Joi.string().valid('SWIM', 'BIKE' ,'RUNNING').required(),
    duree: Joi.number().integer().min(30).max(330).required(),
    day: Joi.date().iso().required()
})




// middleware sample
/*
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});
*/


var infos =[
  { route: '/sports/pages/:page', methode: 'GET' ,  message: '[Pagination]'},
  { route: '/sports/:id', methode: 'GET' ,  message: '[Item]'},
  { route: '/sports/:id' ,methode: 'DELETE' ,  message: '[Item]'},
  { route: '/sports/:id',methode: 'PUT' ,  message: '[Modification]'},
  { route: '/sports/',methode: 'POST' ,  message: '[Ajout]'},

];



///////////////////////////////////////////////////////////////////////////////////////////
// define the home page route
router.get('/', function(req, res) {
  res.render('api', { method : infos}  );
});
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
var query = "SELECT * FROM prod.sports WHERE id = ?" ;
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
//method delete...
router.delete('/:id', function(req, res, next) {  
  var id = req.params.id ;
  if( ! id.match("^[0-9]+$") )   {
    var e = new Error("id must be an integer");
    e.status = 400 ;
    throw ( e );
  }
  var conn = undefined ;
  var query = "DELETE FROM prod.sports WHERE id = ?" ;
  var p = [id] ;
  
  
  dbtool.connect(server.pool).then(con => {
      conn = con;
      return dbtool.doQuery(conn, query, p );
   }).then(result => {
      conn.release();
      conn = undefined ;
      return res.json( { result: result.affectedRows } )	;
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
  var query ="INSERT INTO prod.sports SET ?" ;
  var p = [ datas ] ;
  
  
  dbtool.connect(server.pool).then(con => {
      conn = con;
      return dbtool.doQuery(conn, query, p );
   }).then(result => {
      conn.release();
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
  var query = "UPDATE prod.sports SET ? WHERE id = ? " ;
  var p = [ datas , id ] ;
  
  
  dbtool.connect(server.pool).then(con => {
      conn = con;
      return dbtool.doQuery(conn, query, p );
   }).then(result => {
      conn.release();
      return res.json( result )	;
  }).catch(error => {
    if (conn) {
      conn.release();
    }
      return next( error );
    
   });
  
  })
//////////////////////////////////////////////////////////////////////////////////////////////
// define the about route
router.get('/pages/:page', function(req, res, next) {

  var PAGE = req.params.page;

  if( ! PAGE.match("^[0-9]+$") )   {
    var e = new Error("page  must be an integer !!");
    e.status = 400 ;
    // HttpStatus.NOT_FOUND ;
   // return next (e);
    throw ( e );

  }

  
 
  var WHERE ="";
  if( req.query && req.query.search ) {
    var bs= req.query.search ;
    var w = "";
    if(bs) {
      w += " firstname LIKE '%"+bs+"%' " ;
      w += " OR ";
      w += " lastname LIKE '%"+bs+"%' " ;
    }
    

    if ( w.length != 0  ) {
      WHERE = " WHERE "+ w;
    }
    
  }
  

  var LIMIT = 10 ;
  var pages = 1 ;
  var total = 0; 


  var conn = undefined ;
  var query = "SELECT COUNT (*) as total  FROM prod.sports "+WHERE ;
  dbtool.connect(server.pool).then(con => {
     conn = con;
     return dbtool.doQuery(conn, query, [] );
   })
    .then(result =>  { 
      total = result[0].total ;
      if( total > LIMIT ) {
        pages  = Math.ceil( total / LIMIT  )  ;
      }
 
      if (PAGE > pages  ) {
        PAGE  = pages ;
      }   
   
     OFFSET = ( PAGE-1 ) * LIMIT ;
    
     query = "SELECT * FROM prod.sports "+WHERE+" LIMIT "+ LIMIT +" OFFSET "+OFFSET  ;
     return dbtool.doQuery(conn, query, [] );
    })
      .then( result => {
     const d = {current: PAGE , total: total , pages :pages , datas : result } ;
     conn.release();
     return res.json( d );
   }).catch(error => {
     if (conn) {
       conn.release();
     }
     return next( error );
     
    });




});




//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////












module.exports = router;
