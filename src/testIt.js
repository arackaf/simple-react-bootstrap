import NavBar from './NavBar.js';
import { render } from 'react-dom';
import React from 'react';

render(
    <NavBar>
        <div>Div 1 <button>btn</button></div>
        <NavBar.Item></NavBar.Item>
        <div>Div 2</div>
        <div>Div 3 <div>foo <span>s</span></div></div>
        <NavBar.Item></NavBar.Item>
    </NavBar>, document.getElementById('home'));

export default null;