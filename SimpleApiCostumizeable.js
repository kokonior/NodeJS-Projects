var express = require("express");
var app = express();
var mysql = require("mysql");
var bodyParser = require("body-parser");
var cors = require("cors");

app.use(bodyParser.json({ type: "application/json" }));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

var con = mysql.createConnection({
  host: "koempro-server.cwsly2cix1oo.us-east-1.rds.amazonaws.com",
  user: "admin",
  password: "adminintek",
  database: "koempro_server",
});

con.connect((error) => {
  if (error) console.log(`${error} Ada yang salah!`);
  else console.log("connected");
});

app.get("/", (req, res) => {
  res.send("Hello Koem!");
});
