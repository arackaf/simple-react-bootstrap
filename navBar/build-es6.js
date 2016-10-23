import Builder from 'systemjs-builder';
import gulp from 'gulp';
import gulpUglify from 'gulp-uglify';
import gulpRename from 'gulp-rename';
import remove from 'remove';
import cp from 'glob-copy';

let builder = new Builder({
    baseURL: './'
});
builder.config({
    map: {
        'react': 'node_modules/react/dist/react.js',
        'react-dom': 'node_modules/react-dom/dist/react-dom.js'
    },
    meta: { }
});

try { remove.removeSync('./dist'); } catch(err) { }

builder
    .buildStatic('src/NavBar.js - react', 'dist/NavBarStaticBuild.js', { format: 'umd', globalName: 'NavBar', globalDeps: { 'react': 'React' } })
    .then(copySrc)
    .then(() => {
        gulp.src(['./dist/**/*.js', '!./dist/**/*-es6.js'], {base: './'})
            .pipe(gulpUglify())
            .pipe(gulpRename(function (path) {
                path.basename = path.basename + '.min';
            }))
            .pipe(gulp.dest(''));
    });

function copySrc(){
    return new Promise((res, rej) => {
        cp('./src/**/*.js', './dist', err => {
            if (err) rej(err);
            else res();
        });
    });
}