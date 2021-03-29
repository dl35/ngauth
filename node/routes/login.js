var express = require('express');
var  dbtool = require('./dbtool'); 
const Joi = require('joi');
var router = express.Router();
var server = require('../app');
var config = require('../config');



const schema = Joi.object().keys({
    user:Joi.string().required() ,
    passwd:Joi.string().required()
    });




router.post('/', (req, res , next ) => {

    var datas = req.body ;
    var result = schema.validate( datas );
    if (result.error) {
        return res.status(400).json({ error: result.error.details[0].message });
      }
      return  getLogin( req, res, next );
    
  })


function getLogin( req , res ,next) {

      const user = req.body.user ;
      const passwd = req.body.passwd ;

      var conn = undefined ;
      var query = "SELECT id, role  FROM prod.users WHERE user = ? AND passwd = ? ";
      var p = [ user, passwd ] ;
      
     

      dbtool.connect(server.pool).then(con => {
          conn = con;
          return dbtool.doQuery(conn, query, p );
       }).then(result => {
          conn.release();
          conn = undefined ;
          if( result[0] ) {
            const r = result[0];
            const obj = {id:r.id, role:r.role} ;
            const token= config.generateToken( obj );
            const v = { token , ...obj} ;
            return res.json( v) ;
          } else {
            return  res.status(400).json( {message: 'user or passwd is incorrect'} ) ;
          }
 

      }).catch(error => {
        if (conn) {
          conn.release();
        }
          return next( error );
        
       });

  



    }






  module.exports = router;