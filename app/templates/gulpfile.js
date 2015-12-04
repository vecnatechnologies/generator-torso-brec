var browserifyBundler, copyResources, buildStyles, buildApp, packageApp,
    gulp = require('gulp'),
    gulpLoadPlugins = require('gulp-load-plugins'),
    $ = gulpLoadPlugins({}),
    log = require('color-log'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    watchify = require('watchify'),
    browserify = require('browserify'),
    runSequence = require('run-sequence'),
    ratchet = require('ratchet-npm'),
    paths = {
      app: 'app',
      dist: 'dist'
    };

/* Browserify bundler */
watchify.args.debug = ($.util.env.type !== 'production');
browserifyBundler = browserify(watchify.args);

/* Empty the paths.dist directory */
gulp.task('clean', function() {
  return gulp.src(paths.dist, {read: false})
    .pipe($.rimraf());
});

/* Copy all resources to dist */
copyResources = function() {
  log.mark('Copying resources...');
  return gulp.src([
      paths.app + '/**/*.*',
      '!' + paths.app + '/**/*.+(js|hbs|scss)',
    ])
    .pipe(gulp.dest(paths.dist));
};

gulp.task('copy-resources', copyResources);

/* Build all styles */
buildStyles = function() {
  return gulp.src([paths.app + '/styles/**/*.scss'])
  .pipe($.sass({
    includePaths: [ratchet.scss],
    onSuccess: function(err) {
      log.mark('[SUCCESS] {Sass} ' + err.css.length + ' bytes written (' + (err.stats.duration / 1000.0) + ' seconds)');
    },
    onError: function(err) {
      log.error('[ERROR] {Sass} @ ' + (new Date()));
      log.warn('Message: ' + err.message);
      log.warn('in file --> ' + err.file);
    }
  }))
  .pipe(gulp.dest(paths.dist + '/styles'))
};
gulp.task('build-styles', buildStyles);

/* Reduce all javascript to app.js */
buildApp = function() {
  return browserifyBundler.bundle()
    .on('error', function(err, b) {
      delete err.stream;
      log.error('[ERROR] {Browserify} @ ' + (new Date()));
      log.warn(err.toString());
      return true;
    })
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe($.util.env.type !== 'production' ? $.sourcemaps.init({loadMaps: true}) : $.util.noop())
    .pipe($.util.env.type === 'production' ? $.uglify() : $.util.noop())
    .pipe($.util.env.type !== 'production' ? $.sourcemaps.write('./') : $.util.noop())
    .pipe(gulp.dest(paths.dist + '/scripts'));
};
gulp.task('build-app', buildApp);

/* Full build */
gulp.task('build', function(callback) {
  browserifyBundler.add('./' + paths.app + '/scripts/main');
  browserifyBundler.transform('aliasify', {global: true});
  browserifyBundler.transform('hbsfy');
  runSequence('clean',
    [
      'copy-resources',
      'build-styles',
      'build-app'
    ],
    callback);
});

/* Watch build */
gulp.task('watch', function() {
  browserifyBundler = watchify(browserifyBundler);
  browserifyBundler.on('update', buildApp);
  browserifyBundler.on('log', function(err) {
    log.mark('[SUCCESS] {Javascript} ' + err.toString());
  });
  gulp.start('build', function() {
    gulp.watch(paths.app + '/**/*.scss', buildStyles);
    gulp.watch([
      paths.app + '/**/*.*',
      '!' + paths.app + '/**/*.+(hbs|js|scss)',
    ], copyResources);
  });
});
