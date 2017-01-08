var gulp 	= require('gulp'),
sass 		= require('gulp-sass'),
browserSync = require('browser-sync').create(),
useref 		= require('gulp-useref'),
uglify 		= require('gulp-uglify'),
gulpIf 		= require('gulp-if'),
prefix      = require('gulp-autoprefixer'),
cssnano 	= require('gulp-cssnano'),
del 		= require('del'),
runSequence = require('run-sequence'),
plumber     = require('gulp-plumber'),
notify      = require('gulp-notify'),
imagemin 	= require('gulp-imagemin');

gulp.task('sass', function() {
    var onError = function(err) {
        notify.onError({
            title:    "Gulp",
            subtitle: "Failure!",
            message:  "Error: <%= error.message %>",
            sound:    "Beep"
        })(err);
        this.emit('end');
    };

	return gulp.src('app/scss/styles.scss') // Gets all files ending with .scss in app/scss
    .pipe(plumber({errorHandler: onError}))
    .pipe(sass())
    .pipe(prefix())
  	.pipe(gulp.dest('app/css'))
  	.pipe(browserSync.reload({
  	stream: true
    }))
  });

gulp.task('watch', ['browserSync', 'sass'], function (){
	gulp.watch('app/scss/**/*.scss', ['sass']); 
	// Reloads the browser whenever HTML or JS files change
	gulp.watch('app/*.html', browserSync.reload); 
	gulp.watch('app/js/**/*.js', browserSync.reload); 
});

gulp.task('browserSync', function() {
	browserSync.init({
		server: {
	 		baseDir: 'app'
		},
	})
})

gulp.task('useref', function(){
  return gulp.src('app/*.html')
  .pipe(useref())
  .pipe(gulpIf('*.js', uglify()))
    // Minifies only if it's a CSS file
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
  });

gulp.task('images', function(){
  return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
  .pipe(imagemin({
      // Setting interlaced to true
      interlaced: true
    }))
  .pipe(gulp.dest('dist/images'))
});

gulp.task('build', function (callback) {
  runSequence( 
    ['sass', 'useref', 'images'],
    callback
    )
})

gulp.task('default', function (callback) {
  runSequence(['sass','browserSync', 'watch'],
    callback
    )
})