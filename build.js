const rollup = require('rollup');
const babel = require('rollup-plugin-babel');
const remove = require('remove');
const gulpUglify = require('gulp-uglify');
const gulpRename = require('gulp-rename');
const gulp = require('gulp');
const alias = require('rollup-plugin-alias');
const path = require('path');
const fsE = require('fs-extra');
const gulpBabel = require('gulp-babel');
const rename = require('gulp-rename');
const gprint = require('gulp-print');

var babelOptions = {
    presets: ['react', ['es2015', {modules: false}], 'stage-2']
};

try { remove.removeSync('./dist'); } catch (e) { }

const getRollup = entry =>
    rollup.rollup({
        entry,
        plugins: [
            babel({
                presets: ['react', ['es2015', { modules: false }], 'stage-2'],
                plugins: ['external-helpers']
            }),
            alias({
                'react-raw-tabs': 'node_modules/react-raw-tabs/lib/tabs.js'
            })
        ]
    });

runRollup();
function runRollup(){
    Promise
        .resolve(getRollup('src/library.js'))
        .then(library => 
            Promise.all([
                library.write({ format: 'cjs', dest: './dist/simple-react-bootstrap.js' }),
                library.write({ format: 'iife', dest: './dist/simple-react-bootstrap-script-tag.js', moduleName: 'SimpleReactBootstrap', globals: { react: 'React', 'react-dom': 'ReactDOM', 'react-raw-tabs':'ReactRawTabs' } })
            ])
        ).then(() => {
            gulp.src(['./dist/**/*.js'], { base: './' })
                .pipe(gulpUglify())
                .pipe(gulpRename(path => { path.basename = path.basename + '.min'; }))
                .pipe(gulp.dest(''))
                .on('end', transpileSource)
        }).catch(err => console.log(err));
}

function transpileSource(){
    gulp.src('./src/**/*.js', { base: './' })
        .pipe(gulpBabel(babelOptions))
        .pipe(rename(path => { path.dirname = path.dirname.replace(/src/, 'lib')} ))
        .pipe(gulp.dest(''))
        .pipe(gprint(function(filePath){ return "File transpiled: " + filePath; }));
}