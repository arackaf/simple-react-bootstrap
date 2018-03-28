const rollup = require("rollup");
const babel = require("rollup-plugin-babel");
const remove = require("remove");
const gulpUglify = require("gulp-uglify-es").default;
const gulpRename = require("gulp-rename");
const gulp = require("gulp");
const alias = require("rollup-plugin-alias");
const path = require("path");
const fsE = require("fs-extra");
const gulpBabel = require("gulp-babel");
const rename = require("gulp-rename");
const gprint = require("gulp-print");

var babelOptionsES5 = {
  presets: ["react", "es2015", "stage-2"]
};

var babelOptionsES6 = {
  presets: ["react", "stage-2"]
};

try {
  remove.removeSync("./dist");
} catch (e) {}
try {
  remove.removeSync("./dist-es5");
} catch (e) {}

const getRollup = entry =>
  rollup.rollup({
    entry,
    plugins: [
      babel({
        presets: ["react", ["es2015", { modules: false }], "stage-2"],
        plugins: ["external-helpers"]
      }),
      alias({
        "react-raw-tabs": "node_modules/react-raw-tabs/lib/tabs.js"
      })
    ]
  });

const getRollupES6 = entry =>
  rollup.rollup({
    entry,
    plugins: [
      babel({ presets: ["react", "stage-2"] }),
      alias({
        "react-raw-tabs": "node_modules/react-raw-tabs/lib/tabs.js"
      })
    ]
  });

runRollup();
function runRollup() {
  Promise.resolve(getRollup("src/library.js"))
    .then(library => Promise.resolve(library.write({ format: "es", dest: "./dist-es5/simple-react-bootstrap.js" })))
    .then(() => {
      gulp
        .src(["./dist-es5/**/*.js"], { base: "./" })
        .pipe(gulpUglify())
        .pipe(
          gulpRename(path => {
            path.basename = path.basename + ".min";
          })
        )
        .pipe(gulp.dest(""));
    })
    .catch(err => console.log(err));

  Promise.resolve(getRollupES6("src/library.js"))
    .then(library => Promise.resolve(library.write({ format: "es", dest: "./dist/simple-react-bootstrap.js" })))
    .then(() => {
      gulp
        .src(["./dist/**/*.js"], { base: "./" })
        .pipe(gulpUglify())
        .pipe(
          gulpRename(path => {
            path.basename = path.basename + ".min";
          })
        )
        .pipe(gulp.dest(""))
        .on("end", transpileSource);
    })
    .catch(err => console.log(err));
}

function transpileSource() {
  gulp
    .src("./src/**/*.js", { base: "./" })
    .pipe(gulpBabel(babelOptionsES5))
    .pipe(
      rename(path => {
        path.dirname = path.dirname.replace(/src/, "lib-es5");
      })
    )
    .pipe(gulp.dest(""))
    .pipe(
      gprint(function(filePath) {
        return "File transpiled: " + filePath;
      })
    );
  gulp
    .src("./src/**/*.js", { base: "./" })
    .pipe(gulpBabel(babelOptionsES6))
    .pipe(
      rename(path => {
        path.dirname = path.dirname.replace(/src/, "lib");
      })
    )
    .pipe(gulp.dest(""))
    .pipe(
      gprint(function(filePath) {
        return "File transpiled: " + filePath;
      })
    );
}
