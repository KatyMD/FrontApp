var gulp = require('gulp');
var sass = require('gulp-sass')(require('sass'));
var cleanCss = require('gulp-clean-css');
var rename = require('gulp-rename');

var paths = {
  sass: ['./scss/**/*.scss']
};

function compileSass(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./www/css/'))
    .pipe(cleanCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
}

function watchFiles() {
  gulp.watch(paths.sass, compileSass);
}

// Tarea predeterminada
gulp.task('default', gulp.series(compileSass));

// Tarea para observar cambios en los archivos SCSS
gulp.task('watch', gulp.series(compileSass, watchFiles));

