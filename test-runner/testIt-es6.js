import { render } from 'react-dom';
import React from 'react';

import ButtonDropdown from '../src/ButtonDropdown';

render(
    <ButtonDropdown>
        <button className="btn btn-default dropdown-toggle"><i className="fa fa-fw fa-tag"></i></button>
        <div className="dropdown-menu">
            <h1>Hello</h1>
        </div>
    </ButtonDropdown>, document.getElementById('home'));


//bound in dom 0 handler in default.htm - to test unMount events
window.clearNavBar = function(){
    render(<div>Gone</div>, document.getElementById('home'));
};

export default null;