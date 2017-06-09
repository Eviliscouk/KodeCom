"use strict"
const express = require('express');
const app = express();

const controller = require("./controllers");


controller.init(app);


app.use('/', express.static(__dirname + '/'));
app.use(express.logger('dev')); // log every request to the console
app.use(express.cookieParser()); // read cookies (needed for auth)
app.use(express.bodyParser()); // get information from html forms
	
app.set("view engine","vash");




app.listen(process.env.PORT, function () {
  console.log('Example app listening on port %s!', process.env.PORT)
});
