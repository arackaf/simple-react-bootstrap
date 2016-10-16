const rollup = require('rollup');
const babel = require('rollup-plugin-babel');
const remove = require('remove');
const gulp = require('gulp');
const gulpUglify = require('gulp-uglify');
const gulpRename = require('gulp-rename');

try { remove.removeSync('./dist'); } catch (e) { }

rollup.rollup({
    entry: 'src/navBar.es6',
    plugins: [
        babel({
            presets: ['react', ['es2015', { modules: false }], 'stage-2']
        })
    ]
}).then(bundle =>
    Promise.all([
        bundle.write({ format: 'cjs', dest: './dist/navBar.js' }),
        // bundle.write({ format: 'iife', dest: './dist/navBar-script-tag.js', moduleName: 'NavBar', globals: { react: 'React', 'react-dom': 'ReactDom' } })
    ])
).then(() => {
    gulp.src('./dist/**/*.js', { base: './' })
        .pipe(gulpUglify())
        .pipe(gulpRename(path => { path.basename = path.basename + '.min'; }))
        .pipe(gulp.dest(''))
}).catch(err => console.log(err));