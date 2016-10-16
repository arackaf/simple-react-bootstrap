'use strict';

var rollup = require('rollup');
var babel = require('rollup-plugin-babel');
var remove = require('remove');

try {
    remove.removeSync('./dist');
} catch (e) {}

rollup.rollup({
    entry: 'src/buttonDropdown.es6',
    plugins: [babel({
        presets: ['react', ['es2015', { modules: false }], 'stage-2'],
        plugins: [['external-helpers-2', { whitelist: ['extends'] }]]
    })]
}).then(function (bundle) {
    return Promise.all([bundle.write({ format: 'cjs', dest: './dist/buttonDropdown.js' }), bundle.write({ format: 'iife', dest: './dist/buttonDropdown-script-tag.js', moduleName: 'ButtonDropdown', globals: { react: 'React' } })]);
}).catch(function (err) {
    return console.log(err);
});