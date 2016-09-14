/*!
 * Created by Rex Wang on Sept. 14, 2016
 * Bootstrap.js, kicks off the app.
 */

define([
  'require',
  'jquery'
], function(require, $) {
  'use strict';

  $(document).ready(function() {
    var root = 'http://jsonplaceholder.typicode.com';

    $.ajax({
      url: root + '/posts/1',
      method: 'GET'
    }).then(function(data) {
      $('#foo').html('<p>' + data.title + '</p>');
    });
  });
});
