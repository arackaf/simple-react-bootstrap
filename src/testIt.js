import NavBar from './NavBar.js';
import { render } from 'react-dom';
import React from 'react';

import Collapse from 'react-collapse';

class CollTest extends React.Component {
    constructor(){
        super();
        this.state = { open: true };
    }
    toggle(){
        this.setState({ open: !this.state.open });
    }
    render(){
        return (
            <div style={{ width: 500 }}>
                <button onClick={() => this.toggle()}>Toggle</button>
                <Collapse isOpened={ this.state.open } springConfig={{ stiffness: 300, damping: 26 }}>
                    <div>
                        <div>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sagittis viverra augue, ornare accumsan velit feugiat sit amet. Donec luctus elementum dolor eget placerat. Morbi nulla nibh, tristique sed cursus ac, vulputate eget ex. In iaculis pretium lorem. Proin imperdiet, mi in feugiat commodo, felis turpis fringilla felis, ac ornare mi nunc ut ante. Integer volutpat eros sit amet molestie semper. Ut lacus purus, porta in facilisis et, gravida sed lacus. Sed eget est libero. Sed vel justo laoreet, elementum lorem eu, porttitor ligula. Phasellus eu tempor diam. Ut velit elit, malesuada at mattis quis, tempor ut orci. Nulla id ipsum arcu. Suspendisse potenti. Vestibulum molestie, velit quis cursus accumsan, ante ligula efficitur elit, mollis semper augue leo ac magna. In interdum, elit in blandit pharetra, eros libero accumsan purus, sit amet rhoncus enim felis nec elit.
                            Aliquam quis tristique nisi. Mauris quis suscipit ligula. Integer nec blandit arcu. Aliquam vestibulum congue erat id ultrices. Aliquam et ligula efficitur, condimentum orci vitae, rhoncus dui. Proin sed rutrum lectus, id porta ex. In metus enim, placerat quis blandit porttitor, convallis non erat. In blandit urna diam, sit amet sagittis odio posuere eget.
                        </div>
                    </div>
                </Collapse>
            </div>
        );
    }
}

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

render(<CollTest />, document.getElementById('home2'));

export default null;