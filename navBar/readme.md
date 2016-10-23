Dirt simple React bindings for a Bootstrap NavBar

# Installing

If you're using a tool to manage your npm installs, like WebPack or jspm, then just import it with 

`import NavBar from 'simple-react-bootstrap-navbar'`

If you're just using a script loader, like SystemJS, you'll first need to configure the path to `src/NavBar.js`, as in 

`"simple-react-bootstrap-navbar": "node_modules/simple-react-bootstrap-navbar/dist/NavBar.js",`

# Usage

```html
import NavBar from 'simple-react-bootstrap-navbar';
import { render } from 'react-dom';
import React from 'react';

render(
    <NavBar>
        <NavBar.Header>
            <NavBar.Brand>
                <a style={{ cursor: 'pointer' }}>Header</a>
            </NavBar.Brand>
            <NavBar.Toggle />
        </NavBar.Header>
        <NavBar.Nav>
            <NavBar.Item>Link 1</NavBar.Item>
            <NavBar.Item active={true}>Link 2</NavBar.Item>
            <NavBar.Item href="http://www.google.com">Link 3</NavBar.Item>
            <NavBar.Dropdown text="Sub menu">
                <NavBar.Item>Sub option a</NavBar.Item>
                <NavBar.Item>Sub option b</NavBar.Item>
                <NavBar.Item>Sub option c</NavBar.Item>
            </NavBar.Dropdown>
        </NavBar.Nav>
        <NavBar.Form pullLeft={true}>
            <div className="form-group">
                <div className="input-group">
                    <span className="input-group-btn">
                        <button className="btn default">Search</button>
                    </span>
                    <input className="form-control" placeholder="Quick title search" />
                </div>
            </div>
        </NavBar.Form>
    </NavBar>, document.getElementById('home'));
```