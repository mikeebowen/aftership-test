'use strict';

require('dotenv').config();
var path = require('path');
var bodyparser = require('body-parser');
var aftership = require('aftership')(process.env.AFTERSHIP_API_KEY);

module.exports = function (router) {
  router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
  });
  
  router.use(bodyparser.json());
    router.use(bodyparser.urlencoded({
      extended: true
  }));

    let body = {
      'tracking': {
        'tracking_number': '1ZA9Y7170310894713 '
      }
    };

    router.get('/hello', function (req, res) {
      aftership.call('POST', '/trackings', {
        body: body
      }, function (err, result) {
        if (err) {
          res.status(500).json({msg: 'internal server error'});
          console.error(err);
        } else {

          res.end(result);
        }
      });
      
    })
  
  router.get('/couriers', function (req, res) {
    aftership.call('post', '/trackings', {
      body: body
    }, function (err, result) {
        if (err) {
          console.log(err);
          res.status(500).json({msg: 'Internal server error'});
        } else {
          res.json(result);
      }
    });
  });
  
  router.get('/allshipments', function (req, res) {
    aftership.call('get', '/trackings', {
      query: query
    }, 
    function (err, result) {
      res.json(result) ;
    });
  });
  
  router.get('/trackpackage/:slug/:tracking_number', function (req, res) {
    aftership.call('get', '/trackings/' + req.params.slug + '/' + req.params.tracking_number, function (err, result) {
      if (err) {
        console.error(err);
        res.status(500).json({msg: 'Internal server error'});
      } else {
        res.status(200).writeHead({'Access-Control-Allow-Origin': '*'}).json(result);
      }
    });
  });
  
  router.post('/trackshipment', function (req, res) {
    var reqBody = {'tracking' : {'tracking_number': req.body.trackingNumber}}
    // console.log(reqBody);
   /* aftership.call('get', '/trackings', 
      body: reqBody, 
      function (err, result) {
        if (err) {
          console.error(err);
          res.status(500).json({msg: 'Internal server error'});
        } else {
          res.json(result);
        }
      })*/
    // console.log(req.body);
    /*aftership.call('POST', '/trackings', {
      body: body
    }, function (err, result) {
      console.log(result);
    });*/
    aftership.call('get', '/trackings', {
      body: reqBody
    }, function (err, result) {
      // Your code here 
     /*for (var key in result) {
      console.log(result[meta]);
     }*/
     res.json(result);
    });
  
  });
}