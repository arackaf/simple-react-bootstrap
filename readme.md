# simple-react-bootstrap
Dirt simple React components implementing those Bootstrap components which require more than just css classes, namely Modal, ButtonDropdown, and NavBar.  

Note: these components used to be separate npm installs, namely `simple-react-bootstrap-modal`, `simple-react-bootstrap-navbar`, and `simple-react-bootstrap-button-dropdown`.  The code is the same, they're just all under one project now, as they probably should have always been.

# Installing

If you're using a tool to manage your npm installs, like WebPack or jspm, then just import it with 

`import {Modal, NavBar, ButtonDropdown} from 'simple-react-bootstrap'`

If you're just using a script loader, like SystemJS, you'll first need to configure the path to `dist/simple-react-bootstrap.js`, as in 

`"simple-react-bootstrap": "node_modules/simple-react-bootstrap/dist/simple-react-bootstrap.js"`

Note that the dist folder this project installs with also has stand-alone builds of just the modal, navBar, and buttonDropdown, if you don't need them all; just be aware that NavBar is bundled with buttonDropdown, since it uses it.

Lastly, if you want to test these components from just a script tag, like in a jsbin, or similar, then you can use the `simple-react-bootstrap-script-tag.js` file, also in the dist folder.

# Documentation

The documentation / samples for these components follows, but a quick note on why there's no tabs component. It boils down to the fact that's easier to manually implement tabs components as needed, than to abstract it well.  The markup Bootstrap is expecting is rather straightforward, and it's reasonably easy to write helpers tailored to your app's architecture that listens to the right clicks, and adds the active class where needed.  For example, here's what my MobX helpers look like for rendering Bootstrap tabs.