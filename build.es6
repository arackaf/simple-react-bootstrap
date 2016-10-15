const rollup = require('rollup');
const babel = require('rollup-plugin-babel');
const remove = require('remove');

try { remove.removeSync('./dist'); } catch (e) { }

rollup.rollup({
    entry: 'src/buttonDropdown.es6',
    plugins: [
        babel({
            presets: ['stage-2', 'react']
        })
    ]
}).then(bundle =>
    Promise.all([
        bundle.write({ format: 'cjs', dest: './dist/buttonDropdown_ES6.js' }),
        bundle.write({ format: 'iife', dest: './dist/buttonDropdown-script-tag_ES6.js', moduleName: 'ButtonDropdown', globals: { react: 'React' } })
    ])
).catch(err => console.log(err));


