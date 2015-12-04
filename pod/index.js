var generators = require('yeoman-generator');
var _ = require('underscore');
var util = require('../util');

module.exports = generators.NamedBase.extend({

  writing: function() {
    var templateName = this.name + '-template.hbs',
        viewName = this.name + 'View.js',
        sassName = '_' + this.name + '.scss';

    console.log('building view');
    this.fs.copyTpl(
        this.templatePath('view.js'),
        this.destinationPath(this.name + '/' + viewName),
        {template: templateName}
    );
    console.log('building template');
    this.fs.copyTpl(
        this.templatePath('template.hbs'),
        this.destinationPath(this.name + '/' + templateName),
        {}
    );
    console.log('building sass file');
    this.fs.copyTpl(
        this.templatePath('_styles.scss'),
        this.destinationPath(this.name + '/' + sassName),
        {}
    );
  },

  writeToAppScss: function() {
    try {
      var appPath = this.env.options.appPath || '.';
      var fullPath = appPath + '/app.scss';

      util.rewriteFile({
        file: fullPath,
        addLineAtEnd: true,
        splicable: [
          "@import '" + this.name + '/' + this.name + "';"
        ]
      });
    } catch (e) {
      this.log('\n Unable to find ' + fullPath + '. Reference to _' + this.name + '.scss ' + 'not added.\n');
    }
  }
});
