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

  router.post('/trackshipment', function (req, res) {
    var reqBody = {'tracking' : {'tracking_number': req.body.trackingNumber, 'slug' : ''}};
    var shippingInfo;
    var theSlug = '';
    var theTrackingNumber = req.body.trackingNumber;
    
    aftership.call('post', '/trackings', {
      body: reqBody
    }, function (err, result) {
      
      if (err && err.code !== 4003) {
        console.log(err);
        res.json({msg: 'Internal server error'}).status(500);
      }

      if (err && err.code === 4003) {
        reqBody.tracking.slug = err.data.tracking.slug; 
      } 
      if (!err) {
        reqBody.tracking.slug = result.data.tracking.slug;
      }
      if (!err || err.code === 4003) {
        aftership.call('get', '/trackings/' + reqBody.tracking.slug + '/' + reqBody.tracking.tracking_number, function (err, result) {
          if (err) {
            console.log(err);
            res.json({msg: 'Internal server error'}).status(500);
          } 
          if (!err) {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.json(result).status(202);            
          }
        });
      }
    });
  });

 
}