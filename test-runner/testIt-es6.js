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
        <br /><br />
        <ButtonDropdown style={{ width: '400px', backgroundColor: 'red' }}>
            <button className="btn btn-default">Out of the box styling</button>
            <div>
                <h1>Hello</h1>
            </div>
        </ButtonDropdown>
        <br /><br />
        <ButtonDropdown onClick={() => console.log('HELLO WORLD')}>
            <button className="btn btn-default">click handler respected</button>
            <div>
                <h1>Hello</h1>
            </div>
        </ButtonDropdown>
        <br /><br />
        <ButtonDropdown containerElementType="span">
            <button className="btn btn-default">Use a span</button>
            <div>
                <h1>Hello</h1>
            </div>
        </ButtonDropdown>
        <br /><br />
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
        <br /><br />
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
        <br /><br />
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
        <br /><br />
        <ButtonDropdown>
            <i className="fa fa-tag"></i>
            <span>Arbitrary children</span>
            <span>Hello</span>
            <a className="dropdown-toggle"><i className="fa fa-fw fa-caret-down"></i></a>
            <span>{`<- toggle's right there`}</span>
            <div className="dropdown-menu">
                <div>
                    <span>
                        <h1>Hello</h1>
                    </span>
                </div>
                <h1>World</h1>
            </div>
        </ButtonDropdown>
        <br /><br />
        <ButtonDropdown deferDropdownRendering={true} ignoreContentClick={true}>
            <i className="fa fa-tag"></i>
            <span>Arbitrary children + deferDropdown + ignore content click</span>
            <span>Hello</span>
            <a className="dropdown-toggle"><i className="fa fa-fw fa-caret-down"></i></a>
            <span>{`<- toggle's right there`}</span>
            <div className="dropdown-menu">
                <div>
                    <span>
                        <h1>Hello</h1>
                    </span>
                </div>
                <h1>World</h1>
            </div>
        </ButtonDropdown>
        <br /><br />

        <ButtonDropdown>
            <i className="fa fa-tag"></i>
            <span>Arbitrary children + with null</span>
            <span>Hello</span>
            {null}
            <a className="dropdown-toggle"><i className="fa fa-fw fa-caret-down"></i></a>
            <span>{`<- toggle's right there`}</span>
            <div className="dropdown-menu">
                <div>
                    <span>
                        <h1>Hello</h1>
                    </span>
                </div>
                <h1>World</h1>
            </div>
        </ButtonDropdown>
        <br /><br />
        <ButtonDropdown>
            <i className="fa fa-tag"></i>
            <span>Arbitrary children + with null - no toggle or content</span>
            <span> Hello </span>
            {null}
            {null && <a className="dropdown-toggle"><i className="fa fa-fw fa-caret-down"></i></a>}
            <span>{`no toggle`}</span>
            {null && <div className="dropdown-menu">
                <div>
                    <span>
                        <h1>Hello</h1>
                    </span>
                </div>
                <h1>World</h1>
            </div>}
        </ButtonDropdown>
        <br /><br />

    </div>, document.getElementById('home'));


//bound in dom 0 handler in default.htm - to test unMount events
window.clearNavBar = function(){
    render(<div>Gone</div>, document.getElementById('home'));
};

export default null;