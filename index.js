var express = require('express');
var app = express();


var engine = require('ejs-locals');
app.engine('ejs',engine);
app.set('files','./files');
app.set('view engine','ejs');


var mysql = require('mysql');

// connect MySQL
var connection = mysql.createConnection({
  host     : 'bbj31ma8tye2kagi.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
  user     : 'zzchjdmk8ywg7njg',
  password : 'dbm7ak0y45rc5xis',
  database: 'hfddtgcgaqo469k5'
});


const data ={}

// select MyGuests table and print all colums
connection.query('select * from auth', function(err, rows, fields) {
  if (err) throw err;
  data.user = rows[0];
  console.log(data.user)
});

// use express get method 
// create root router and print hello world
app.get('/', function(req, res){
  res.render('index',{data: data.user});
});

// app.get('/', function(req, res){
//   res.send('index');
// });

// check running enviroment
var port = process.env.PORT || 5000;

// create
app.listen(port);

// only print hint link for local enviroment 
  console.log(`RUN http://localhost:${port}/`)