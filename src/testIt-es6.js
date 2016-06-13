import NavBar from './NavBar.js';
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
            <NavBar.Item><a>Link 1</a></NavBar.Item>
            <NavBar.Item className="active"><a>Link 2</a></NavBar.Item>
            <NavBar.Item><a>Link 3</a></NavBar.Item>
        </NavBar.Nav>
    </NavBar>, document.getElementById('home'));

export default null;