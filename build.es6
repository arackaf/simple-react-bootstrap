const rollup = require('rollup');
const babel = require('rollup-plugin-babel');
const remove = require('remove');
const gulpUglify = require('gulp-uglify');
const gulpRename = require('gulp-rename');
const gulp = require('gulp');
const alias = require('rollup-plugin-alias');

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
                resolve: ['.es6'],
                './buttonDropdown.js': './buttonDropdown'
            })
        ]
    });

Promise.all([
    getRollup('src/library.es6'),
    getRollup('src/modal.es6'),
    getRollup('src/buttonDropdown.es6'),
    getRollup('src/navBar.es6')
]).then(([library, modal, buttonDropdown, navBar]) =>
    Promise.all([
        library.write({ format: 'cjs', dest: './dist/simple-react-bootstrap.js' }),
        library.write({ format: 'iife', dest: './dist/simple-react-bootstrap-script-tag.js', moduleName: 'SimpleReactBootstrap', globals: { react: 'React', 'react-dom': 'ReactDOM' } }),
        modal.write({ format: 'cjs', dest: './dist/modal.js' }),
        navBar.write({ format: 'cjs', dest: './dist/navBar.js' }),
        buttonDropdown.write({ format: 'cjs', dest: './dist/buttonDropdown.js' })
    ])
).then(() => {
    gulp.src('./dist/**/*.js', { base: './' })
        .pipe(gulpUglify())
        .pipe(gulpRename(path => { path.basename = path.basename + '.min'; }))
        .pipe(gulp.dest(''))
}).catch(err => console.log(err));


