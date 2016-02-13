'use strict'; 

$(function () {
  var $trackingNumberForm = $('#trackingNumberForm');
  var $shippingInfo = $('#shippingInfo');
  var shippingDataOutput = '';
  var itemNum = 1;

  $trackingNumberForm.submit(function (e) {
    e.preventDefault();
    var $form = $(this);
    var $formData = $form.serialize();
    var $url = $form.attr('action');

      // alert($formData);
    $.post($url, $formData)
    .done(function (data) {
      // console.log(data.data.page);
      for (var key in data.data) {
        for (var key2 in data.data[key]) {
          // console.log(data.data[key][key2]);
          for (var key3 in data.data[key][key2]) {
            // console.log(data.data[key][key2][key3]);
            for (var key4 in data.data[key][key2][key3]) {
              if (typeof data.data[key][key2][key3][key4] === 'object') {
                // console.log(data.data[key][key2][key3][key4]);
                shippingDataOutput += '<h2>Item Number: ' + itemNum + '</h2><ul><li>Carrier: ' + data.data[key][key2][key3][key4].slug + '</li><li>Location: ' + data.data[key][key2][key3][key4].location + '</li><li>Status: ' + data.data[key][key2][key3][key4].message + '</li></ul>';
                itemNum += 1;
              };
            }
          }
          // console.log(shippingDataOutput);
          $shippingInfo.html(shippingDataOutput);
        }
      }
    });
  });
});