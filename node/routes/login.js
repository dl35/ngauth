var express = require('express');

const Joi = require('joi');
var router = express.Router();
var config = require('../config');



const schema = Joi.object().keys({
    user:Joi.string().required() ,
    passwd:Joi.string().required()
    });




router.post('/', (req, res) => {

    var datas = req.body ;
    var result = schema.validate( datas );
    if (result.error) {
        return res.status(400).json({ error: result.error.details[0].message });
      }
    
    const u = req.body.user ;
    const p = req.body.passwd ;
   
    const v =  validLogin(u,p) ;

    if( v == false ) {
       return  res.status(400).json( {message: 'user or passd is incorrect'} ) ;
    } else {
        return res.json(v)

    }


    
  })




 function validLogin( u , p ) {

  console.log( u , p   );
 
    var logins =  config.listLogins  ;
 
    
    var user = logins.find( e =>  e.user == u && e.passwd == p  ) ;
    if( user ) {
        const obj = {id:user.id,role:user.role};
        const token= config.generateToken(obj);
        const v = { token , ...obj } ;
        return v ;
    } else {

      return false;
    }



 }




  module.exports = router;