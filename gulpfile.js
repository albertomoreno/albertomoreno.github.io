
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


function watchStyles() {
  let files = [
    'styles/main.css',
  ];
  return gulp.watch(files, {ignoreInitial: false}, function styles() {
    return gulp.src('styles/main.css')
      .pipe($.postcss([
        require('postcss-import')({
          path: ['.'],
        }),
        require('tailwindcss'),
        require('autoprefixer'),
      ]))
      .pipe(gulp.dest('static/styles'));
  });
}


exports.serve = gulp.series(
  fonts,
  gulp.parallel(watchStyles, serve, livereload),
);
