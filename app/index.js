var generators = require('yeoman-generator');
var _ = require('underscore');

var paths = {
  'app/index.html': {},
  'app/home/homeView.js': {},
  'app/home/home-template.hbs': {},
  'app/app.scss': {},
  'app/main.js': {},
  'dist/.keepme': {},
  'package.json': {},
  'gulpfile.js': {},
  '.gitignore': {}
};

module.exports = generators.Base.extend({
  writing: function() {
    _.each(paths, function(context, path) {
      console.log('copying: ' + path);
      this.fs.copyTpl(
          this.templatePath(path),
          this.destinationPath(path),
          context
      );
    }, this);
  },

  install: function () {
    var generator = this;
    this.npmInstall("", function() {
      generator.spawnCommand('gulp', ['build']);
    });
  }
});
