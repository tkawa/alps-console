var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var webserver = require('gulp-webserver');

gulp.task('browserify', function() {
  browserify({entries: ['./src/App.js'], debug: true })
    .transform(babelify.configure({plugins: ["object-assign"]}))
    .bundle()
    .on("error", function (err) { console.log("Error : " + err.message); })
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('dist'))
});

gulp.task('watch', function() {
  gulp.watch('./src/*.js', ['browserify'])
});

gulp.task('webserver', function() {
  gulp.src('./')
    .pipe(webserver({
      host: '127.0.0.1',
      livereload: true,
      proxies: [
        {
          source: '/schema',
          target: 'http://alps.io/schema.org'
        }
      ]
    })
  );
});

gulp.task('default', ['browserify', 'watch', 'webserver']);
