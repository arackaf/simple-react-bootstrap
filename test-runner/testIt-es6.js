import { render } from 'react-dom';
import React from 'react';

import ButtonDropdown from '../src/ButtonDropdown';

render(
    <div style={{ paddingLeft: 30 }}>
        <ButtonDropdown>
            <button className="btn btn-default">Out of the box</button>
            <div>
                <h1>Hello</h1>
            </div>
        </ButtonDropdown>
        <br /><br /><br />
        <ButtonDropdown>
            <button className="btn btn-default"><h4>Some styling</h4><i className="fa fa-fw fa-tag"></i></button>
            <div>
                <div>
                    <span>
                        <h1>Hello</h1>
                    </span>
                </div>
                <h1>World</h1>
            </div>
        </ButtonDropdown>
        <br /><br /><br />
        <ButtonDropdown ignoreContentClick={true}>
            <button className="btn btn-default">Menu doesn't cause dropdown to close</button>
            <div>
                <div>
                    <span>
                        <h1>Hello</h1>
                    </span>
                </div>
                <h1>World</h1>
            </div>
        </ButtonDropdown>
        <br /><br /><br />
        <ButtonDropdown deferDropdownRendering={true} ignoreContentClick={true}>
            <button className="btn btn-default">Dropdown on demand</button>
            <div>
                <div>
                    <span>
                        <h1>Hello</h1>
                    </span>
                </div>
                <h1>World</h1>
            </div>
        </ButtonDropdown>

    </div>, document.getElementById('home'));


//bound in dom 0 handler in default.htm - to test unMount events
window.clearNavBar = function(){
    render(<div>Gone</div>, document.getElementById('home'));
};

export default null;