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

      // console.log($formData);
    $.post($url, $formData)
    .done(function (data) {
      console.log(data.length);
      console.log(data.msg === 'Internal server error');
      if (data.msg === 'Internal server error') {
        alert('There was a problem with your tracking number, please try again');
      }
      if (data.msg !== 'Internal server error') {
        for (var key in data.data) {
          shippingDataOutput = '<div id="' + 'itemNum' + '"><h2>Tracking Number : ' + data.data.tracking_number + '</h2><ul><li>Carrier : ' +  data.data.slug + '</li><li>Status : ' + data.data.tag + '</li><li>Last Check in Location: ' + data.data.checkpoint.city + ', ' + data.data.checkpoint.state + ', ' + data.data.checkpoint.zip + ', ' + data.data.checkpoint.country_name + '</li><li>Last Check in Time : ' + data.data.checkpoint.checkpoint_time + '</li></ul><button type="button" onclick="$(this).parent().remove()">Remove</button></div>';
        }

      }
      $shippingInfo.prepend(shippingDataOutput);
      $form[0].reset();
    });
  });
});