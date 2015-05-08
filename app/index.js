var generators = require('yeoman-generator');
var _ = require('underscore');

var paths = {
  'app/index.html': {},
  'app/scripts/home/homeView.js': {},
  'app/scripts/home/home-template.hbs': {},
  'app/styles/app.scss': {},
  'app/scripts/main.js': {},
  'dist/.keepme': {},
  'package.json': {},
  'gulpfile.js': {}
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
    this.fs.copyTpl(
      this.templatePath('_gitignore'),
      this.destinationPath('.gitignore'),
      {}
    );
  },

  install: function () {
    var generator = this;
    this.npmInstall("", function() {
      generator.spawnCommand('gulp', ['build']);
    });
  }
});
