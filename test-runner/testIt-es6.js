import { render } from 'react-dom';
import React from 'react';

import Tabs from '../src/ButtonDropdown';

render(
    <Tabs />, document.getElementById('home'));


//bound in dom 0 handler in default.htm - to test unMount events
window.clearNavBar = function(){
    render(<div>Gone</div>, document.getElementById('home'));
};

export default null;