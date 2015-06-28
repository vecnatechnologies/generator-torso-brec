var $ = require('jquery');

require('torso/node_modules/backbone').$ = $;

// Expose some globals
window.$ = $;
window.jQuery = $;

require('brec-base/js/alerts');

$(window).ready(function () {
  /**
   * The application router object
   */
  require('./router').start();
});

