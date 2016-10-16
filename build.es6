const rollup = require('rollup');
const babel = require('rollup-plugin-babel');
const remove = require('remove');
const gulp = require('gulp');
const gulpUglify = require('gulp-uglify');
const gulpRename = require('gulp-rename');
const nodeResolve = require('rollup-plugin-node-resolve');

try { remove.removeSync('./dist'); } catch (e) { }

const rollupConfig = {
    entry: 'src/navBar.es6',
    plugins: [
        babel({
            presets: ['react', ['es2015', { modules: false }], 'stage-2']
        })
    ]
};

const rollupConfigBundleAll = {
    entry: 'src/navBar.es6',
    plugins: [
        babel({
            presets: ['react', ['es2015', { modules: false }], 'stage-2'],
            plugins: ['external-helpers']
        }),
        nodeResolve({
            skip: ['react', 'react-dom']
        })
    ]
};

Promise.all([
    rollup.rollup(rollupConfig),
    rollup.rollup(rollupConfigBundleAll)
]).then(([bundle, bundleAll]) =>
    Promise.all([
        bundle.write({ format: 'cjs', dest: './dist/navBar.js' }),
        bundleAll.write({ format: 'iife', dest: './dist/navBar-with-button-dropdown-script-tag.js', moduleName: 'NavBar', globals: { react: 'React', 'react-dom': 'ReactDom' } }),
        bundleAll.write({ format: 'cjs', dest: './dist/navBar-with-button-dropdown.js' })
    ])
).then(() => {
    gulp.src('./dist/**/*.js', { base: './' })
        .pipe(gulpUglify())
        .pipe(gulpRename(path => { path.basename = path.basename + '.min'; }))
        .pipe(gulp.dest(''))
}).catch(err => console.log(err));