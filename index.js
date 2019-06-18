var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var jsonParser = bodyParser.json();

var engine = require("ejs-locals");
app.engine("ejs", engine);
app.set("files", "./files");
app.set("view engine", "ejs");

var mysql = require("mysql");

// connect MySQL
var connection = mysql.createConnection({
  host: "bbj31ma8tye2kagi.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
  user: "zzchjdmk8ywg7njg",
  password: "dbm7ak0y45rc5xis",
  database: "hfddtgcgaqo469k5"
});

const data = {};

// select MyGuests table and print all colums
connection.query("select * from auth", function(err, rows, fields) {
  if (err) throw err;
  data.user = rows;
  console.log(data.user);
});

// use express get method
// create root router and print hello world
app.get("/", function(req, res) {
  res.render("index", { data: data.user });
});

app.post("/addUser", jsonParser, function(req, res) {
  if (req.body.username) {
    console.log(req.body.username);
    var sql =
      "INSERT INTO auth (username) VALUES ('" + req.body.username + "')";

    connection.query(sql, function(err, rows, fields) {
      if (err) throw err;
      res.send("success");
    });
  } else {
    throw err;
  }
});

// app.get('/', function(req, res){
//   res.send('index');
// });

// check running enviroment
var port = process.env.PORT || 5000;

// create
app.listen(port);

// only print hint link for local enviroment
console.log(`RUN http://localhost:${port}/`);
