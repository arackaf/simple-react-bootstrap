const rollup = require('rollup');
const babel = require('rollup-plugin-babel');
const remove = require('remove');
const gulpUglify = require('gulp-uglify');
const gulpRename = require('gulp-rename');
const gulp = require('gulp');

try { remove.removeSync('./dist'); } catch (e) { }

rollup.rollup({
    entry: 'src/buttonDropdown.es6',
    plugins: [
        babel({
            presets: ['react', ['es2015', { modules: false }], 'stage-2']
        })
    ]
}).then(bundle =>
    Promise.all([
        bundle.write({ format: 'cjs', dest: './dist/buttonDropdown.js' }),
        bundle.write({ format: 'iife', dest: './dist/buttonDropdown-script-tag.js', moduleName: 'ButtonDropdown', globals: { react: 'React', 'react-dom': 'ReactDom' } })
    ])
).then(() => {
    gulp.src('./dist/**/*.js', { base: './' })
        .pipe(gulpUglify())
        .pipe(gulpRename(path => { path.basename = path.basename + '.min'; }))
        .pipe(gulp.dest(''))
}).catch(err => console.log(err));


