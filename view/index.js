var generator  = require('yeoman-generator');
var util       = require('util');
var path       = require('path');
var validDir = require('../helpers/validateDirectory');


module.exports = Generator;

function Generator() {
  generator.NamedBase.apply(this, arguments);
  var dirPath = '../app/templates/torso-modules';
  this.sourceRoot(path.join(__dirname, dirPath));
}

util.inherits(Generator, generator.NamedBase);

Generator.prototype.createViewFiles = function createViewFiles() {
  var ext = 'js';
  var baseDir = validDir.getValidatedFolder( 'app/' );

  this.template('view.' + ext, path.join(baseDir + 'scripts/' + this.name.toLowerCase(), this.name + 'View.' + ext));
};