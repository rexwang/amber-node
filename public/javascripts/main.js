require.config({
  // alias libraries paths
  paths: {
    'jquery': './bower_components/jquery/dist/jquery.min',
    'react': './bower_components/react/react.min',
    'react-dom': './bower_components/react/react-dom.min'
  },

  // angular does not support AMD out of the box, put it in a shim
  shim: {
    'react': {
      'exports': 'React'
    }
  },

  // kick start application
  // deps: ['./build/app']
});

require(['./build/base']);
