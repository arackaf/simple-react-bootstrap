const rollup = require('rollup');
const babel = require('rollup-plugin-babel');
const remove = require('remove');

try { remove.removeSync('./dist'); } catch (e) { }

rollup.rollup({
    entry: 'src/buttonDropdown.es6',
    plugins: [
        babel({
            presets: ['react', ['es2015', { modules: false }], 'stage-2'],
            plugins: [['external-helpers', { whitelist: ['asyncGenerator'] }]]
        })
    ]
}).then(bundle =>
    Promise.all([
        bundle.write({ format: 'cjs', dest: './dist/buttonDropdown.js' }),
        bundle.write({ format: 'iife', dest: './dist/buttonDropdown-script-tag.js', moduleName: 'ButtonDropdown', globals: { react: 'React' } })
    ])
).catch(err => console.log(err));


