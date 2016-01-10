var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var plugin = gulpLoadPlugins();
var browserify = require('browserify');
var vss = require('vinyl-source-stream');
var stylish = require('jshint-stylish');

//TODO preventy copying files which will be concat/minified during build
var copyFiles = [
  './src/**/*'
  // '!./src/public/css/',
  // '!./src/public/lib/',
];

//Build for Heroku
gulp.task('heroku:production', ['build']);

//copy dev to build
gulp.task('copyToBuild', function(){
  return gulp.src(copyFiles).pipe(gulp.dest('./build'));
});

//lint
gulp.task('lint', function() {
  return gulp.src(['./src/public/app/**/*.js','!src/public/lib/allLibs.js'])
    .pipe(plugin.jshint())
    .pipe(plugin.jshint.reporter(stylish));
});

//browserify using vinyl source streams (gulp-browserify no longer maintained)
//allLibs.js must be deleted before running or there will be an error
gulp.task('browserify', function() {
  //file to browserify
  return browserify('./src/public/app/app.js')
    .bundle()
    .on('error', function(error){console.log(error);})
    //output name
    .pipe(vss('allLibs.js'))
    //output location
    .pipe(gulp.dest('./src/public/lib/'));
});

//start dev version using nodemon
gulp.task('nodemon', function(){
  return plugin.nodemon({script: 'src/server.js', watch: ['src/server/**/*','src/server.js']});
});

//start build version
gulp.task('start', plugin.shell.task([
  'echo Starting the server!',
  'node build/server.js'
]));

//watch
gulp.task('watch', function(){
  return gulp.watch('./src/public/app/**/*', ['build']);
});

//build
gulp.task('build', ['lint','browserify','copyToBuild']);


//DEV TO LAUNCH NODEMON AND KEEP AN EYE ON FILES AUTOMATICALLY
 gulp.task('dev', ['watch','nodemon']);

