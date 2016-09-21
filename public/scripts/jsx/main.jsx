require.config({
  // alias libraries paths
  paths: {
    'jquery': '../bower_components/jquery/dist/jquery.min',
    'react': '../bower_components/react/react.min',
    'react-dom': '../bower_components/react/react-dom.min',
    'text': '../bower_components/requirejs-text/text',
    'json': '../bower_components/requirejs-plugins/src/json'
  },

  // angular does not support AMD out of the box, put it in a shim
  shim: {
    'react': {
      'exports': 'React'
    }
  }
});

require(['jquery'], function($) {
  var module = $('script[src$="require.js"]').data('module');
  if (module) {
    require([module]);
  }
});
