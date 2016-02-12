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
var body = {
  'tracking': {
    'tracking_number': '906587618687',
    'tracking_postal_code': 'DA15BU',
    'tracking_ship_date': '20131231',
    'tracking_account_number': '1234567890',
    'slug': ['dhl', 'ups', 'fedex']
  }
};

var query = {slug: 'dhl,ups,usps'};

app.get('/', function (req, res) {
  aftership.call('get', '/couriers/all', function (err, result) {
    if (err) {
        console.error(err);
        res.status(500).json({msg: 'Internal server error'});
      } else {
        res.json(result);
    }
  });
});

app.get('/couriers', function (req, res) {
  aftership.call('post', '/trackings', {
    body: body
  }, function (err, result) {
      if (err) {
        console.error(err);
        res.status(500).json({msg: 'Internal server error'});
      } else {
        res.json(result);
    }
  });
});

app.get('/allshipments', function (req, res) {
  aftership.call('get', '/trackings', {
    query: query
  }, 
  function (err, result) {
    res.json(result) ;
  });
});

app.get('/trackpackage/:slug/:tracking_number', function (req, res) {
  aftership.call('get', '/trackings/' + req.params.slug + '/' + req.params.tracking_number, function (err, result) {
    if (err) {
      console.error(err);
      res.status(500).json({msg: 'Internal server error'});
    } else {
      res.json(result);
    }
  })
})



app.listen(port, function () {
  console.log(clc.cyanBright('server started at: ' + time + ' on port: ' + port));
});