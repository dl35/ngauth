var os = require('os'),
	path = require('path');
var jwt = require('jsonwebtoken');

var development = process.env.NODE_ENV !== 'production';
var default_port = 3000;

var TOKEN_SECRET = 'apitest35';
var TOKEN_ALGO = 'HS256';

var mysql_config = 
{
	connectionLimit : 2,
	host            : 'mysql',
	user            : 'prod',
	password        : 'prod',
	database 		: 'prod',
	timezone		: 'utc',
	dateStrings		: false
}

var listLogins = [
	{id:99 , role: 'admin' , user:'admin@test.fr'  , passwd: 'admin'  },
	{id:33 , role: 'user'  , user:'user@test.fr' , passwd: 'user' },

]





function validToken( req,res,next ) {

	console.log( req.baseUrl );

    const authheader = req.headers['authorization'];
    const token = authheader && authheader.split(' ')[1];
    if( token == null ) return res.status(401).json({message :'Unauthorized' });
    jwt.verify( token , TOKEN_SECRET, { algorithms: [ TOKEN_ALGO] } , ( err, value )  => {
      if( err ) {
        return res.status(403).send( err.message ) ;
       }
      req.profile = value.profile ;
      next() ;
    } )
  
  }

 function generateToken ( obj ) {
	return jwt.sign( obj, TOKEN_SECRET, { algorithm: TOKEN_ALGO , expiresIn: '12h' } );
  }

function validRole( roles ) {

	return  (req, res, next) => {
	try {

			if ( roles.length == 0 ) {
				next();	
				}

			var p = roles.find(  r => r == req.profile ) 		
			if( p ) {
				next();
				} else {
				return res.status(401).json({message :'Unauthorized' });
				}

		} catch( error) {
			next(error)
		}

}
}




module.exports.development = development;
module.exports.default_port = default_port;
module.exports.mysql_config = mysql_config;
module.exports.listLogins = listLogins;
module.exports.validToken = validToken;
module.exports.generateToken = generateToken;
module.exports.validRole = validRole;