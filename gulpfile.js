var gulp = require('gulp'),
    clean = require('gulp-clean');

gulp.task('clean', function() {
    return gulp.src('build', {
            read: false
        })
        .pipe(clean());
});

gulp.task('compile behaviors', function(){
   return gulp.src('src/ratling-trader/game/behaviors', {
            read: false
        })
        .pipe(writeJson);
});

function writeJson(){
    debugger;
}