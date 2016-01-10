var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var plugin = gulpLoadPlugins();
var browserify = require('browserify');
var vss = require('vinyl-source-stream');
var stylish = require('jshint-stylish');

//utility functions
var printBuildComplete = function(){
  var greenText = '\[\033[32m\] %s \[\033[m\]';
  console.log(greenText, '************************************************************');
  console.log(greenText, '*****                BUILD COMPLETED!                  *****');
  console.log(greenText, '************************************************************');
};

var printBuildError = function(){
  var redText = '\[\033[31m\] %s \[\033[m\]';
  console.log(redText, '************************************************************');
  console.log(redText, '*****               BUILD BREAKING ERROR!              *****');
  console.log(redText, '************************************************************');
};

var printDevComplete = function(){
  var cyanText = '\[\033[36m\] %s \[\033[m\]';
  console.log(cyanText, '************************************************************');
  console.log(cyanText, '*****               DEV BUILD COMPLETED!               *****');
  console.log(cyanText, '************************************************************');
};

var printWatchError = function(){
  var redText = '\[\033[31m\] %s \[\033[m\]';
  console.log(redText, '************************************************************');
  console.log(redText, '*****     ERROR OCCURED - EXIT THEN RESTART WATCH!     *****');
  console.log(redText, '************************************************************');
};

//used for error handling in tasks that would otherwise cause watch to fail silently
var watchErrorContinue = function(err) {
  var redText = '\[\033[31m\] %s \[\033[m\]';
  var message = 'YOUR CODE WILL NOT PASS BUILD DUE TO:\n' + err.message;
  console.log(redText, message);
  //emit end allows the watch task to continue
  this.emit('end');
};

//TODO preventy copying files which will be concat/minified during build
var copyFiles = [
  './src/**/*'
  // '!./src/public/css/',
  // '!./src/public/lib/',
];

//build for heroku
gulp.task('heroku:production', ['build']);

//lint
gulp.task('lint', function() {
  return gulp.src(['./src/public/app/**/*.js','!src/public/lib/allLibs.js'])
    .pipe(plugin.jshint())
    .pipe(plugin.jshint.reporter(stylish)).on('error', watchErrorContinue);
});

//lint strict - breaks build on error
gulp.task('lintStrict', function() {
  return gulp.src(['./src/public/app/**/*.js','!src/public/lib/allLibs.js'])
    .pipe(plugin.jshint())
    .pipe(plugin.jshint.reporter(stylish))
    .pipe(plugin.jshint.reporter('fail')).on('error', printBuildError);
});

//browserify using vinyl source streams (gulp-browserify no longer maintained)
gulp.task('browserify', function() {
  //file to browserify
  return browserify('./src/public/app/app.js')
    .bundle().on('error', watchErrorContinue)
    //output name
    .pipe(vss('allLibs.js')).on('error', watchErrorContinue)
    //output location
    .pipe(gulp.dest('./src/public/lib/')).on('error', watchErrorContinue);
});

//browserify strict - breaks build on error
gulp.task('browserifyStrict', function() {
  //file to browserify
  return browserify('./src/public/app/app.js')
    .bundle().on('error', printBuildError)
    //output name
    .pipe(vss('allLibs.js')).on('error', printBuildError)
    //output location
    .pipe(gulp.dest('./src/public/lib/')).on('error', printBuildError);
});

//start dev version using nodemon
gulp.task('nodemon', function(){
  return plugin.nodemon(
    {script: 'src/server.js', watch: ['src/server/**/*','src/server.js']}
  ).on('error', printWatchError);
});

//starts build server
gulp.task('start', plugin.shell.task([
    'echo Starting the server!',
    'node build/server.js'
  ])
);

//watch
gulp.task('watch', function(){
  return gulp.watch('./src/public/app/**/*', ['devBuild']).on('error', printWatchError);
});

//dev build
gulp.task('devBuild', ['lint','browserify'], printDevComplete);

//dev to launch nodemon and keep an eye on files automatically
gulp.task('dev', ['watch','nodemon']);

//build wont copy if any tasks in array throw errors
//need a way to ensure copying doesn't have any errors
gulp.task('build', ['lintStrict','browserifyStrict'], function(){
  gulp.src(copyFiles).pipe(gulp.dest('./build'))
  .on('end', printBuildComplete)
  .on('error', printBuildError);
});

//default to dev task
gulp.task('default', ['dev']);
