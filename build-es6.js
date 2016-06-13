import Builder from 'systemjs-builder';
import gulp from 'gulp';
import gulpUglify from 'gulp-uglify';
import gulpRename from 'gulp-rename';
import remove from 'remove';


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

remove.removeSync('./dist');

Promise.all([
    builder.bundle('src/NavBar.js - react', 'dist/NavBar.js'),
    builder.buildStatic('src/NavBar.js - react', 'dist/NavBarStaticBuild.js')
]).then(() => {
    try {
        gulp.src(['./dist/**/*.js'], {base: './'})
            .pipe(gulpUglify())
            .pipe(gulpRename(function (path) {
                path.basename = path.basename + '.min';
            }))
            .pipe(gulp.dest(''));


    } catch (err){
        console.log(err);
    }
});