var generators = require('yeoman-generator');
var _ = require('underscore');

var paths = {
  'app/index.html': {},
  'app/home/homeView.js': {},
  'app/home/home-template.hbs': {},
  'app/home/_home.scss': {},
  'app/app.scss': {},
  'app/app.js': {},
  'app/router.js': {},
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
      generator.spawnCommand('npm', ['run', 'gulp', 'build']);
    });
  }
});
