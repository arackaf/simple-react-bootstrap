SystemJS.config({
  transpiler: "plugin-babel",
  packages: {
    "simple-react-bootstrap-nav": {
      "main": "simple-react-bootstrap-nav.js",
      "meta": {
        "*.js": {
          "loader": "plugin-babel"
        }
      }
    }
  }
});

SystemJS.config({
  packageConfigPaths: [
    "npm:@*/*.json",
    "npm:*.json"
  ],
  map: {
    "plugin-babel": "npm:systemjs-plugin-babel@0.0.12"
  },
  packages: {}
});
