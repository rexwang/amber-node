$(document).ready(function() {
  var root = 'http://jsonplaceholder.typicode.com';

  $.ajax({
    url: root + '/posts/1',
    method: 'GET'
  }).then(function(data) {
    $('#foo').html('<p>' + data.title + '</p>');
  });
});
