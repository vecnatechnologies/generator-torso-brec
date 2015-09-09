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

function logWarning(message) {
  var warningSign = '\x1b[1m\x1b[31m<\x1b[96m\x21\x1b[31m>\x1b[21m\x1b[96m ',
      endSign = '\x1b[0m';
  console.log(warningSign + message + endSign);
}

function installLocalGulpAndBuild(generator) {
  logWarning('You do not have gulp installed globally and will not be able to use the gulp CLI.');
  logWarning('We will install gulp locally for you.\n');
  logWarning('Installing gulp locally...');
  generator.spawnCommand('npm', ['install', 'gulp', '--save-dev'])
    .on('exit', function() {
      logWarning('Success: gulp installed and added to your package.json');
      logWarning('You will need to use `npm run gulp <task>` to execute gulp tasks.');
      generator.spawnCommand('npm', ['run', 'gulp', 'build']);
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
            // We don't have a global gulp module
            installLocalGulpAndBuild(generator);
          } else {
            generator.spawnCommand('gulp', ['build']);
          }
        });
    });
  }
});
