import NavBar from '../src/NavBar.js';
import { render } from 'react-dom';
import React from 'react';

const RegularNavBar = () => (
    <NavBar>
        <NavBar.Header>
            <NavBar.Brand>
                <a style={{ cursor: 'pointer' }}>Header</a>
            </NavBar.Brand>
            <NavBar.Toggle />
        </NavBar.Header>
        <NavBar.Nav>
            <NavBar.Item className="class-on-item">Link 1</NavBar.Item>
            <NavBar.Item disabled={true}>Link 2</NavBar.Item>
            <NavBar.Item href="http://www.google.com">Link 3</NavBar.Item>
            <NavBar.Dropdown className="pointer-cursor" style={{ color: 'red' }} text="Sub menu">
                <NavBar.Item>Sub option a</NavBar.Item>
                <NavBar.Item href="#foo">Sub option b</NavBar.Item>
                <NavBar.Item>Sub option c</NavBar.Item>
            </NavBar.Dropdown>
            <NavBar.Dropdown disabled={true} text="Sub menu">
                <NavBar.Item>Sub option a</NavBar.Item>
                <NavBar.Item>Sub option b</NavBar.Item>
                <NavBar.Item>Sub option c</NavBar.Item>
            </NavBar.Dropdown>
        </NavBar.Nav>
        <NavBar.Form className="pull-left">
            <div className="form-group">
                <div className="input-group">
                        <span className="input-group-btn">
                            <button className="btn default">Search</button>
                        </span>
                    <input className="form-control" placeholder="Quick title search" />
                </div>
            </div>
        </NavBar.Form>
    </NavBar>
);

class RegularNavBarWithManualDropDown extends React.Component {
    constructor() {
        super();
        this.state = { manualOpen: false };
    }
    render() {
        return (
            <div>
                <NavBar>
                    <NavBar.Header>
                        <NavBar.Brand>
                            <a style={{ cursor: 'pointer' }}>Header</a>
                        </NavBar.Brand>
                        <NavBar.Toggle />
                    </NavBar.Header>
                    <NavBar.Nav>
                        <NavBar.Item className="class-on-item">Link 1</NavBar.Item>
                        <NavBar.Item disabled={true}>Link 2</NavBar.Item>
                        <NavBar.Item href="http://www.google.com">Link 3</NavBar.Item>
                        <NavBar.Dropdown open={this.state.manualOpen} className="pointer-cursor" style={{ color: 'red' }} text="Sub menu">
                            <NavBar.Item>Sub option a</NavBar.Item>
                            <NavBar.Item href="#foo">Sub option b</NavBar.Item>
                            <NavBar.Item>Sub option c</NavBar.Item>
                        </NavBar.Dropdown>
                        <NavBar.Dropdown disabled={true} text="Sub menu">
                            <NavBar.Item>Sub option a</NavBar.Item>
                            <NavBar.Item>Sub option b</NavBar.Item>
                            <NavBar.Item>Sub option c</NavBar.Item>
                        </NavBar.Dropdown>
                    </NavBar.Nav>
                    <NavBar.Form className="pull-left">
                        <div className="form-group">
                            <div className="input-group">
                                    <span className="input-group-btn">
                                        <button className="btn default">Search</button>
                                    </span>
                                <input className="form-control" placeholder="Quick title search"/>
                            </div>
                        </div>
                    </NavBar.Form>
                </NavBar>
                <button onClick={() => this.setState({ manualOpen: true })}>Down</button>
                <button onClick={() => this.setState({ manualOpen: false })}>Up</button>
            </div>
        )
    }
}


render(
    <div>
        <RegularNavBar />

        <br /><br /><br />

        <RegularNavBarWithManualDropDown />

    </div>, document.getElementById('home'));


//bound in dom 0 handler in default.htm - to test unMount events
window.clearNavBar = function(){
    render(<div>Gone</div>, document.getElementById('home'));
};

export default null;