const rollup = require('rollup');
const babel = require('rollup-plugin-babel');
const remove = require('remove');
const gulpUglify = require('gulp-uglify');
const gulpRename = require('gulp-rename');
const gulp = require('gulp');

try { remove.removeSync('./dist'); } catch (e) { }

const getRollup = (entry, extHelpers) =>
    rollup.rollup({
        entry,
        plugins: [
            babel({
                presets: ['react', ['es2015', { modules: false }], 'stage-2'],
                plugins: extHelpers ? ['external-helpers'] : []
            })
        ]
    });

Promise.all([
    getRollup('src/library.es6', true),
    getRollup('src/modal.es6'),
    getRollup('src/navBar.es6'),
    getRollup('src/buttonDropdown.es6')
]).then(([library, modal, navBar, buttonDropdown]) =>
    Promise.all([
        library.write({ format: 'cjs', dest: './dist/simple-react-bootstrap.js' }),
        library.write({ format: 'iife', dest: './dist/simple-react-bootstrap-script-tag.js', moduleName: 'ButtonDropdown', globals: { react: 'React', 'react-dom': 'ReactDom' } }),
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


