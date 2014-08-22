var gulp = require('gulp'),
    clean = require('gulp-clean'),
    when = require('when'),
    whenWalk = require('./lib/when-walk/when-walk-ex.js'),
    fs = require('fs'),
    util = require('util'),
    path = require('path');

var srcPath = '../src/ratling-trader/';

gulp.task('default', ['clean', 'compile behaviors', 'compile mixins'], function () {

});

gulp.task('clean', function () {
    return gulp.src('build', {
        read: false
    })
        .pipe(clean());
});

gulp.task('compile behaviors', function (cb) {
    return compileFileList(srcPath, 'app/game/behaviors', 'app/config/behaviors.json');
});

gulp.task('compile mixins', function (cb) {
    return compileFileList(srcPath, 'app/game/mixins', 'app/config/mixins.json');
});
function compileFileList(basePath, sourceDirectory, outputPath) {
    return whenWalk(path.join(basePath, sourceDirectory))
        .then(function (fileList) {
            var files = {};
            for (var i = 0; i < fileList.length; i++) {
                var file = fileList[i];
                files[path.basename(file).replace(/\.js$/, '')] = path.relative(basePath, file);
            }
            var deferred = when.defer();
            fs.writeFile(path.join(basePath, outputPath), JSON.stringify(files, null, 2), function (err) {
                if (err) throw err;
                deferred.resolve();
            });
            return deferred.promise;
        });
}