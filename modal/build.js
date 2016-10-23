'use strict';

var rollup = require('rollup');
var babel = require('rollup-plugin-babel');
var remove = require('remove');
var gulp = require('gulp');
var gulpUglify = require('gulp-uglify');
var gulpRename = require('gulp-rename');

try {
    remove.removeSync('./dist');
} catch (e) {}

rollup.rollup({
    entry: 'src/modal.es6',
    plugins: [babel({
        presets: ['react', ['es2015', { modules: false }], 'stage-2']
    })]
}).then(function (bundle) {
    return Promise.all([bundle.write({ format: 'cjs', dest: './dist/modal.js' }), bundle.write({ format: 'iife', dest: './dist/modal-script-tag.js', moduleName: 'Modal', globals: { react: 'React', 'react-dom': 'ReactDom' } })]);
}).then(function () {
    gulp.src('./dist/**/*.js', { base: './' }).pipe(gulpUglify()).pipe(gulpRename(function (path) {
        path.basename = path.basename + '.min';
    })).pipe(gulp.dest(''));
}).catch(function (err) {
    return console.log(err);
});