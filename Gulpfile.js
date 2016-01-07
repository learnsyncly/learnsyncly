var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var plugin = gulpLoadPlugins();

var copyFiles = [
  './src/**/*',
  '!./src/public/css/',
  '!./src/public/lib/',
];

//copy dev to build
gulp.task('copyToBuild', function(){
  gulp.src(copyFiles).pipe(gulp.dest('./build'));
});

//run browserify
gulp.task('runBrowserify', function(){
  gulp.src('/src/public/index.html')
    .pipe(plugin.browserify())
    .pipe(gulp.dest('/src/public/lib/allLibs.js'));
});


//start dev version using
gulp.task('devStart', function(){
  plugin.nodemon({script: 'src/server.js', ignore: 'node_modules/**/*.js'});
});

//start build version
gulp.task('start', plugin.shell.task([
  'echo Starting the server!',
  'node build/server.js'
]));

//build
gulp.task('build', ['runBrowserify','copyToBuild']);
