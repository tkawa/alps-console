var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var webserver = require('gulp-webserver');

gulp.task('browserify', function() {
  browserify({entries: ['./src/App.js'], debug: true })
    .transform(babelify)
    .bundle()
    .on("error", function (err) { console.log("Error : " + err.message); })
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('public'))
});

gulp.task('watch', function() {
  gulp.watch('./src/*.js', ['browserify'])
});

gulp.task('webserver', function() {
  gulp.src('public')
    .pipe(webserver({
      host: '127.0.0.1',
      livereload: true
    })
  );
});

gulp.task('default', ['browserify', 'watch', 'webserver']);
