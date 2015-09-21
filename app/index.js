var generators = require('yeoman-generator');
var _ = require('underscore');
var clc = require('cli-color');

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

function logWarning(message) {
  var warningSign = clc.bold.cyan('<' + clc.bold.redBright('!') + '> ');
  console.log(warningSign + clc.cyanBright(message));
}

function outputWarning() {
  var gulp = clc.magenta('gulp'),
      prompt = clc.cyan('$ '),
      npm = clc.magenta('npm'),
      quicksip = clc.yellow('quick-sip'),
      command = clc.redBright,
      warn = clc.cyanBright;
  logWarning('We have installed ' + gulp + ' locally to build your-torso-project.\n');
  console.log(warn('To use the gulp tasks setup by ' + quicksip + ', you will need to use the ' + npm + ' run cli with the following command:\n'));
  console.log(command(prompt + npm + ' run gulp ' + clc.bold.white('<task>')));
  console.log();
  console.log(warn('To remove ' + gulp + ' locally and setup ' + gulp + ' globally, run the following command:\n'));
  console.log(command(prompt + npm + ' uninstall gulp ' +clc.white('&& ') + npm + ' install -g gulp'));
}

function installLocalGulpAndBuild(generator) {
  generator.spawnCommand('npm', ['install', 'gulp', '--save-dev'])
    .on('exit', function() {
      logWarning('gulp installed locally');
      generator.spawnCommand('npm', ['run', 'gulp', 'build'])
        .on('exit', function () {
          outputWarning();
        });
    });
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
    this.npmInstall("", function() {
      // Check for a global gulp module
      generator.spawnCommand('npm', ['ls', '-g', '--parseable', 'gulp'])
        .on('exit', function(code) {
          if(code === 1) {
            logWarning('no global gulp...');
            installLocalGulpAndBuild(generator);
          } else {
            generator.spawnCommand('gulp', ['build']);
          }
        });
    });
  }
});
