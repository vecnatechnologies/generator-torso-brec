var gulp = require('gulp'),
    buildProcess = require('quick-sip')(gulp),
    brec = require('brec-tables'),
    paths = {
      app: 'app',
      dist: 'dist',
      scripts: '',
      styles: ''
    };

buildProcess.configurePaths(paths);
buildProcess.nonResources('js|hbs|scss');
buildProcess.addToStylesIncludePaths([brec.base.sass, brec.tables.sass]);
buildProcess.transform('aliasify', {global: true});
buildProcess.transform('hbsfy');
