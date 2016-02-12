'use strict';

require('dotenv').config();
var express = require('express');
var app = express();
var port = process.env.PORT || 4000;
var time = new Date();
var clc = require('cli-color');
var path = require('path');
var bodyparser = require('body-parser');
var aftership = require('aftership')(process.env.AFTERSHIP_API_KEY);

aftership.call('get', '/couriers/all', function (err, result) {
    if (err) {
        console.log(err);
    } else {
      for (var key in result) {
        console.log(result[key]);
      }
        // console.log(typeof result);
    }
});

app.get('/', function (req, res) {
  aftership.call('get', '/couriers/all', function (err, result) {
    if (err) {
        console.log(err);
    } else {
      for (var key in result) {
        console.log(result[key]);
      }
        // console.log(typeof result);
    }
    res.json(result);
  });
});

app.listen(port, function () {
  console.log(clc.cyanBright('server started at: ' + time + ' on port: ' + port));
});