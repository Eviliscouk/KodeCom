"use strict"
/*
first release
*/
const fs = require('fs');
const path = require('path');
const pdf = require('./helper/pdf.js');
var cors = require('cors');
const express = require('express');
const app = express();
var errorHanlder = require('./helper/exception-manager.js');
const passport = require("./helper/passport");
var zip = require('express-zip');
var http = require('http');
var dal = require('./data/mysqlDb')
var server = http.createServer(app);
app.use(cors());
app.use('/', express.static(__dirname + '/'));

app.use(express.logger('dev')); // log every request to the console
app.use(express.cookieParser()); // read cookies (needed for auth)
app.use(express.bodyParser()); // get information from html forms

var env = process.argv[2];
process.params ={};
process.params.env = env;

 dal.listDatabases()
   .then(function(dblist){
       app.set("dblist",dblist);
       
   })
   .catch(function(err){
      app.set("dblist",[]);
      
   }); 
   
   dal.listUserDatabases()
   .then(function(dbuser){
       app.set("logoUrls",dbuser);
   })
   .catch(function(err){
      
      app.set("logoUrls",[]);
   }); 
   
 console.log('environment setup = ' + env);
 console.log('args= ' + JSON.stringify(process.argv));
 
if (process.params.env=="prod")
{
    process.params.baseUrl ="http://www.paygenieonline.co.uk";
    //process.params.logoUrl = process.params.baseUrl + '/images/KodeCom.png';
    process.params.port = 49155;   
}
else if (process.params.env =="dev")
{
    
   process.params.baseUrl ="http://kode-com-kerrjp.c9users.io";
   //process.params.logoUrl = process.params.baseUrl + '/images/KodeCom.png';
   process.params.port = process.env.PORT;
}
else 
{
    
   process.params.baseUrl ="http://kode-com-kerrjp.c9users.io";
}

console.log(JSON.stringify(process.params));

pdf.killAllPhantomProcess();

dal.FailBatches().then(function(result){
       console.log(result);
       
   })
   .catch(function(err){
      console.log(err);
      
   }); 


app.use( express.static( "public" ) );


server.on('error', errorHanlder.manageError);

passport.init(app);
	
const controller = require("./controllers");
controller.init(app);

app.set("view engine","vash");

if (!fs.existsSync('temp_documents')){
    fs.mkdirSync('temp_documents');
}

if (!fs.existsSync('batches')){
    fs.mkdirSync('batches');
}

// Clear temp docs
const directory = path.resolve('temp_documents');
fs.readdir(directory, (err, files) => {
  if (err) console.log(err);

  for (const file of files) {
    fs.unlink(path.join(directory, file), err => {
      if (err) console.log(err);
    });
  }
});

app.listen(process.params.port, function () {
  console.log('App running on port %s!', process.params.port);
});
