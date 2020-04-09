
const gulp = require('gulp'),
      $ = require('gulp-load-plugins')(),
      express = require('express'),
      app = express();


function serve() {
  app.use(express.static('.'));
  app.listen(8080);
  console.log('Listening on port: 8080');
}


function livereload() {
  let files = [
    'index.html',
  ];
  $.watch(files, function() {
    $.livereload.reload();
  });

  $.livereload.listen();
}


function fonts() {
  let files = [
    'node_modules/@fortawesome/fontawesome-free/webfonts/*',
  ];
  return gulp.src(files)
    .pipe(gulp.dest('static/fonts'));
}


exports.serve = gulp.series(
  fonts,
  gulp.parallel(serve, livereload),
);
