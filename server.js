"use strict"
var cors = require('cors');
const express = require('express');
const app = express();
var errorHanlder = require('./helper/exception-manager.js');
const passport = require("./helper/passport");

var http = require('http');
var server = http.createServer(app);
app.use(cors());
app.use('/', express.static(__dirname + '/'));

app.use(express.logger('dev')); // log every request to the console
app.use(express.cookieParser()); // read cookies (needed for auth)
app.use(express.bodyParser()); // get information from html forms

var env = process.argv[2] || "dev";

process.params ={};
 process.params.env = env;
if (process.params.env=="prod")
{
    process.params.baseUrl ="http://kode-com-kerrjp.c9users.io";
    process.params.logoUrl = process.params.baseUrl + '/images/KodeCom.png';
    
}
else if (process.params.env =="dev")
{
    
   process.params.baseUrl ="http://kode-com-kerrjp.c9users.io";
   process.params.logoUrl = process.params.baseUrl + '/images/KodeCom.png';
}
else 
{
    
   process.params.baseUrl ="http://kode-com-kerrjp.c9users.io";
}

console.log(JSON.stringify(process.params));

app.use( express.static( "public" ) );


server.on('error', errorHanlder.manageError);

passport.init(app);
	
const controller = require("./controllers");
controller.init(app);

app.set("view engine","vash");

app.listen(process.env.PORT, function () {
  console.log('Example app listening on port %s!', process.env.PORT)
});
