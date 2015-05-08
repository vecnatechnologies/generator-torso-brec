var Torso = require('torso'),
    $ = require('jquery');

require('torso/node_modules/backbone').$ = $;

// Expose some globals
window.$ = $;
window.jQuery = $;

require('brec-base/js/alerts');

$(window).ready(function () {

  /**
   * The application router object
   */
  var app = new (Torso.Router.extend({
    current: null,
    routes: {
      '': 'index'
    },

    /**
     * Stop the history if it's already started. Bind the routes, and start.
     * and start the history.
     * @method start
     */
    start: function() {
      Torso.history.stop();
      this._bindRoutes();
      Torso.history.start();
    },

    /**
     * Initialize the medicine widgets and page layout
     */
    index: function() {
      this.switchPerspective(require('./home/homeView'));
    },

    /**
     * Switches the current perspective to be the given perspective.
     */
    switchPerspective: function(nextPerspective) {
      if (this.current) {
        this.current.detach();
      }

      this.current = nextPerspective;
      this.current.render();
      this.current.attach($('.app'));
    }
  }))();

  app.start();
});

