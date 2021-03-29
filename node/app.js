const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
var cors = require('cors');
const config = require('./config');
const mysql = require('mysql');






const mysports= require('./routes/mysports');
const mybdd= require('./routes/mybdd');
const myusers= require('./routes/myusers');

const login = require('./routes/login');

////////////////////////////////////////////////////////////////////////////////////
const port = config.default_port;
console.info('initializing (mode '+((config.development)?'development':'production')+')');
//console.log('path= ', __dirname  ) ;

const pool  = mysql.createPool(config.mysql_config);
module.exports.pool = pool;


////////////////////////////////////////////////////////////////////////////////////
const app = express()

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.use(cors());
app.options('*', cors());



app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());





app.use('/login' , login);


app.use('/sports' , config.validToken  , mysports);
app.use('/users' , config.validToken  , myusers);
app.use('/bdd' ,config.validToken, mybdd);




app.get('/', (req, res) => {
  res.send('Hello World!')
})




app.use(function(err, req, res, next) {
  console.error( err.status , err.message );
  var status = (err.status ) ? err.status : 500 ;
  res.status( status ).json( {message: err.message } );
});




app.listen(port, () => {
  console.log(`listen at http://localhost:${port}`)
})