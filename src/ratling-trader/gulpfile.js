var gulp = require('gulp'),
    watch = require('gulp-watch'),
    changed = require('gulp-changed'),
    traceur = require('gulp-traceur'),
    to5 = require('gulp-6to5'),
    plumber = require('gulp-plumber'),
    compilePath = '6to5',
    lazypipe = require('lazypipe');

var standardExcludes = [
    '!.idea{,/**}',
    '!6to5{,/**}',
    '!**/bower_components{,/**}',
    '!**/node_modules{,/**}'
];
var jsGlobs = ['**/*.js'].concat(standardExcludes);
var otherGlobs = [
    '**',
    '!**/*.js',
].concat(standardExcludes);

var bowerGlob = [
    '**/bower_components/**'
];
var traceurTasks = lazypipe()
    .pipe(plumber)
    .pipe(changed, compilePath + '/traceur')
    .pipe(traceur, {blockBinding: true})
    .pipe(gulp.dest, compilePath + '/traceur');

var sixTo5Tasks = lazypipe()
    .pipe(plumber)
    .pipe(changed, compilePath)
    //.pipe(to5)
    .pipe(gulp.dest, compilePath);

var straightCopyTasks = lazypipe()
    .pipe(plumber)
    .pipe(changed, compilePath)
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
        .pipe(straightCopyTasks());
});

gulp.task('bower files', function () {
    return gulp.src(bowerGlob)
        .pipe(straightCopyTasks());
});

gulp.task('watch js', function () {

    return gulp.src(jsGlobs)
        .pipe(watch(jsGlobs))
        //.pipe(traceurTasks())
        .pipe(sixTo5Tasks());
});

gulp.task('watch', ['watch other files', 'watch js', 'watch bower files']);

gulp.task('watch other files', function () {
    return gulp.src(otherGlobs)
        .pipe(watch(otherGlobs))
        .pipe(straightCopyTasks());
});
gulp.task('watch bower files', function () {
    return gulp.src(bowerGlob)
        .pipe(watch(bowerGlob))
        .pipe(straightCopyTasks());
});

gulp.task('default', ['6to5', 'watch', 'other files', 'bower files']);

