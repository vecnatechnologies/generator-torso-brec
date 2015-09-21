var _ = require('underscore');
var color = require('cli-color');

// Set underscore's template system to use handlebars syntax
_.templateSettings = {
  interpolate: /\{\{(.+?)\}\}/g
};

/**
 * Warning message that is displayed post-build when the user does
 * not have a global instillation of gulp.
 *
 * Any indentation added to this string will also show up as output.
 * @type {String}
 */
var gulpInstallWarningRaw =
'\n{{warningSign}} We have installed gulp {{locally}} to build your-torso-project. \
To use the gulp tasks setup by quick-sip, you will need to use the \
npm run cli with the following command:\n\
  {{localGulpCmdSubTemplate}}\n\n\
To remove gulp {{locally}} and setup gulp {{globally}}, run the following command:\n\
  {{setupGlobalGulpCmdSubTemplate}}';

/**
 * Command that the user can run to execute gulp tasks.
 * @type {String}
 */
var localGulpCmdRaw = '{{prompt}} npm run gulp <task>';

/**
 * Command that the user can run to uninstall a local gulp installation
 * and install gulp globally.
 * @type {String}
 */
var setupGlobalGulpCmdRaw = '{{prompt}} npm uninstall gulp && npm install -g gulp';

/**
 * Template for the message output from logWarningMessage.
 * @type {String}
 */
var warningMessageRaw = '{{warningSign}} {{message}}';

/**
 * Object containing context for template compilation
 * and functions for text stylingContext.
 * @type {Object}
 */
var stylingContext = {
  warningSign: color.bold.cyanBright('<' + color.bold.redBright('!') + '>'),
  prompt: color.cyanBright('$'),
  locally: color.yellow('locally'),
  globally: color.yellow('globally')
};

/**
 * Styles command strings
 * @type {Function}
 */
var styleCommand = color.magenta;

/**
 * Styles warning strings
 * @type {[type]}
 */
var styleWarning = color.cyanBright;

/**
 * Creates a new object containing both the stylingContext
 * and additional elements specific to the template
 * @param  {Object} templateContext object containing elements specific to given template
 * @return {Object}                 the full context object to be used to build the styled template
 */
function generateContext(templateContext) {
  return _.extend({}, stylingContext, templateContext);
}

/**
 * Compiles all the templates for the install warning that is triggered
 * when no global installation of gulp is detected
 * @return {String} the styled message for use in yeoman installation
 */
function compileGulpInstallWarningMessage() {
   var localGulpCmdTemplate = _.template(localGulpCmdRaw),
      setupGlobalGulpCmdTemplate = _.template(setupGlobalGulpCmdRaw),
      gulpInstallWarningTemplate = _.template(gulpInstallWarningRaw),
      localGulpCmd, setupGlobalGulpCmd, gulpInstallWarning, context;

  localGulpCmd = styleCommand(localGulpCmdTemplate(stylingContext));
  setupGlobalGulpCmd = styleCommand(setupGlobalGulpCmdTemplate(stylingContext));

  context = generateContext({
              localGulpCmdSubTemplate: localGulpCmd,
              setupGlobalGulpCmdSubTemplate: setupGlobalGulpCmd
            });

  return styleWarning(gulpInstallWarningTemplate(context));
}

/**
 * Compiles the warning message template using the given message
 * @param  {String} message to be styled and injected into the proper template
 * @return {String}         the styled warning message
 */
function compileWarningMessage(message) {
  var warningMessageTemplate = _.template(warningMessageRaw),
      warningMessage, context;

  context = generateContext({message: message});
  return styleWarning(warningMessageTemplate(context));
}

module.exports = {
  compileGulpInstallWarningMessage: compileGulpInstallWarningMessage,
  compileWarningMessage: compileWarningMessage
};