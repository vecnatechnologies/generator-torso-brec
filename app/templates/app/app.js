var $ = require('jquery');

// Expose some globals
window.$ = $;
window.jQuery = $;

require('ratchet-npm/dist/js/ratchet');

$(window).ready(function () {
  /**
   * The application router object
   */
  require('./router').start();
});

