import NavBar from '../src/NavBar.js';
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


//bound in dom 0 handler in default.htm - to test unMount events
window.clearNavBar = function(){
    render(<div>Gone</div>, document.getElementById('home'));
};

export default null;