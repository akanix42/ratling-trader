var gulp = require('gulp'),
    watch = require('gulp-watch'),
    traceur = require('gulp-traceur'),
    to5 = require('gulp-6to5'),
    plumber = require('gulp-plumber'),
    es6Path = 'es6/**/*.js',
    compilePath = '6to5',
    lazypipe = require('lazypipe');

var jsGlobs = [
    '**/*.js',
    '!6to5{,/**}',
    //es6Path,
    '!**/bower_components{,/**}',
    //'!es6/bower_components{,/**}'
];
var otherGlobs = [
    '**',
    '!**/*.js',
    '!.idea{,/**}',
    '!6to5{,/**}',
    '!**/bower_components{,/**}',
    '!**/node_modules{,/**}',
];
var traceurTasks = lazypipe()
    .pipe(plumber)
    .pipe(traceur, {blockBinding: true})
    .pipe(gulp.dest, compilePath + '/traceur');

var sixTo5Tasks = lazypipe()
    .pipe(plumber)
    .pipe(to5)
    .pipe(gulp.dest, compilePath);

var otherTasks = lazypipe()
    .pipe(plumber)
    .pipe(gulp.dest, compilePath);

gulp.task('traceur', function () {
    return gulp.src(jsGlobs)
        .pipe(traceurTasks());
});

gulp.task('6to5', function () {
    return gulp.src(jsGlobs)
        .pipe(sixTo5Tasks());
});

gulp.task('other files', function () {
    return gulp.src(otherGlobs)
        .pipe(otherTasks());
})
gulp.task('watch', function () {

    return gulp.src(jsGlobs)
        .pipe(watch(jsGlobs))
        //.pipe(traceurTasks())
        .pipe(sixTo5Tasks())
        .pipe(otherTasks());

});

gulp.task('default', ['6to5', 'watch']);

