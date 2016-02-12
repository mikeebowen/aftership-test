'use strict';

require('dotenv').config();
var express = require('express');
var shippingRouter = express.Router();
var app = express();
var port = process.env.PORT || 4000;
var time = new Date();
var clc = require('cli-color');

app.use(express.static(__dirname + '/'));

require('./routes/shipping-routes.js')(shippingRouter);

app.use('/', shippingRouter);

app.listen(port, function () {
  console.log(clc.cyanBright('server started at: ' + time + ' on port: ' + port));
});