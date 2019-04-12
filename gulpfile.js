
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


function watchStyles(folder) {
  return function watchStyles() {
    var files = [
      'assets/styles/_variables.scss',
      `assets/styles/${folder}/**/*.scss`,
    ];

    function buildStyles() {
      return gulp.src(files)
        .pipe($.sass({
          precision: 10,
          includePaths: [
            'assets/styles',  // _variables.scss & other global files
            '../..',  // node_modules libs
          ],
          outputStyle: 'expanded',
          sourceComments: true,
        }).on('error', $.sass.logError))
        .pipe($.autoprefixer({browsers: ['last 3 versions', 'not ie < 11']}))
        .pipe(gulp.dest(`static/styles/${folder}`))
        .pipe($.livereload());
    };
    
    $.watch(files, buildStyles);

    return buildStyles();
  };
};


exports.dev = gulp.series(
  watchStyles('design'),
  watchStyles('libs'),
  gulp.parallel(serve, livereload),
);
