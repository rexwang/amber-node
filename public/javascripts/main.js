require.config({
  // alias libraries paths
  paths: {
    'jquery': './bower_components/jquery/dist/jquery.min'
  },

  // angular does not support AMD out of the box, put it in a shim
  shim: {

  },

  // kick start application
  deps: ['./bootstrap']
});
