'use strict'; 

$(function () {
  var $trackingNumberForm = $('#trackingNumberForm');
  var $shippingInfo = $('#shippingInfo');
  var itemNum = 1;


  $trackingNumberForm.submit(function (e) {
    e.preventDefault();
    var $form = $(this);
    var $formData = $form.serialize();
    var $url = $form.attr('action');
    var shippingDataOutput = '';

    $.post($url, $formData)
    .done(function (data) {

      if (data.msg === 'Internal server error') {
        alert('There was a problem with your tracking number, please try again');
      }
      
      if (data.msg !== 'Internal server error') {
        for (var key in data.data.tracking) {
          shippingDataOutput = '<div><h2>Tracking Number : ' + data.data.tracking.title + '</h2><ul><li>Carrier : ' +  data.data.tracking.slug + '</li><li>Status : ' + data.data.tracking.tag + '</li>';

          if (data.data.tracking.checkpoints.length > 0) {
            shippingDataOutput += '<li>Last Check in : <ul><li>Location : ' + data.data.tracking.checkpoints[data.data.tracking.checkpoints.length - 1].location + '</li><li>Time : ' + data.data.tracking.checkpoints[data.data.tracking.checkpoints.length - 1].checkpoint_time + '</li><li>Status : ' + data.data.tracking.checkpoints[data.data.tracking.checkpoints.length - 1].tag + '</li></ul></li><li>Weight : ' + data.data.tracking.shipment_weight + ' ' + data.data.tracking.shipment_weight_unit + '</li></ul><button type="button" onclick="$(this).parent().remove()">Remove</button></div>';

          }

          if (data.data.tracking.checkpoints.length === 0) {
            shippingDataOutput += '</ul><button type="button" onclick="$(this).parent().remove()">Remove</button></div>';
          }
        }

      }
      $shippingInfo.prepend(shippingDataOutput);
      $form[0].reset();
    });
  });
});