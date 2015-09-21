var generators = require('yeoman-generator');
var _ = require('underscore');
var util = require('../util');

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

/**
 * Spawns a child process for the `npm run gulp build` command
 *
 * @param  {Object} yeoman-generator
 * @return {Object} ChildProcess object for the command
 */
function buildGulpWithNpm(generator) {
  return generator.spawnCommand('npm', ['run', 'gulp', 'build']);
}

/**
 * Spawns a child process for the `npm install gulp --save-dev` command
 *
 * @param  {Object} yeoman-generator
 * @return {Object} ChildProcess object for the command
 */
function installLocalGulp(generator) {
  return generator.spawnCommand('npm', ['install', 'gulp', '--save-dev']);
}

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
    // Runs `npm install`
    generator.npmInstall("", function() {
      // Check for a global gulp module
      generator.spawnCommand('npm', ['ls', '-g', '--parseable', 'gulp'])
        .on('exit', function(code) {
          if(code === 1) {
            util.logWarningMessage('no global gulp...');
            installLocalGulp(generator)
              .on('exit', function() {
                util.logWarningMessage('gulp installed locally');
                buildGulpWithNpm(generator).on('exit', util.displayGulpInstallWarning);
              });
          } else {
            buildGulpWithNpm(generator);
          }
        });
    });
  }
});
