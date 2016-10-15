var gulp = require('gulp'),
    rename = require('gulp-rename'),
    plumber = require('gulp-plumber'),
    gprint = require('gulp-print'),
    notify = require('gulp-notify'),
    babel = require('gulp-babel'),
    gulpUglify = require('gulp-uglify'),
    gulpRename = require('gulp-rename');

var babelOptions = {
    presets: ['react', 'es2015', 'stage-2']
};

var paths = ['./src/**/*.es6', './test-runner/**/*.es6', './gulpfile.es6', './build.es6'];

gulp.task('test-u', function () {
    gulp.src('./junk/**/*.js', { base: './' }).pipe(gulpUglify()).pipe(gulpRename(path => {
        path.basename = path.basename + '.min';
    })).pipe(gulp.dest(''));
});
gulp.task('transpile-all', function () {
    gulp.src(paths, { base: './' }).pipe(babel(babelOptions)).pipe(rename({ extname: ".js" })).pipe(gulp.dest('')).pipe(gprint(function (filePath) {
        return "File processed: " + filePath;
    }));
});

gulp.task('transpile-watch', function () {
    return gulp.watch(paths, function (obj) {
        if (obj.type === 'changed') {
            gulp.src(obj.path, { base: './' }).pipe(plumber({
                errorHandler: function (error) {
                    //babel error - dev typed in in valid code
                    if (error.fileName) {
                        var fileParts = error.fileName.split('\\');
                        try {
                            notify.onError(error.name + ' in ' + fileParts[fileParts.length - 1])(error);
                        } catch (e) {} //gulp-notify may break if not run in Win 8
                        console.log(error.name + ' in ' + error.fileName);
                    } else {
                        notify.onError('Oh snap, file system error! :(')(error);
                    }

                    console.log(error.message);
                    this.emit('end');
                }
            })).pipe(babel(babelOptions)).pipe(rename({ extname: ".js" })).pipe(gulp.dest('')).pipe(gprint(function (filePath) {
                return "File processed: " + filePath;
            }));
        }
    });
});