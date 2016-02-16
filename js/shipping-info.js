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
      // console.log(data);
      console.log(data.data.checkpoint);
      for (var key in data.data) {
        shippingDataOutput = '<h2>Tracking Number :' + data.data.tracking_number + '</h2><ul><li>Carrier : ' +  data.data.slug + '</li><li>Status : ' + data.data.tag + '</li><li>Last Check in Location: ' + data.data.checkpoint.city + ', ' + data.data.checkpoint.state + ', ' + data.data.checkpoint.zip + ', ' + data.data.checkpoint.country_name + '</li><li>Last Check in Time : ' + data.data.checkpoint.checkpoint_time + '</li></ul>';
      }
      $shippingInfo.prepend(shippingDataOutput);
      $form[0].reset();
      });
  });
});