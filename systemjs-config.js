System.config({
    packages: {
        '': { //this is the root, catch-all package
            defaultExtension: 'js'
        }
    },
    map: {
        'react': 'node_modules/react/dist/react.js',
        'react-dom': 'node_modules/react-dom/dist/react-dom.js',
    }
});