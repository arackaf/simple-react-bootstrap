import { render } from 'react-dom';
import React, {Component} from 'react';

import ButtonDropdown from '../src/ButtonDropdown';

class DummyButton extends Component {
    render(){
        return <button className={"btn btn-primary" + (' ' + this.props.className)} onClick={this.props.onClick}>Custom Element</button>
    }
}

class TestCases extends Component {
    state = { controlled1Open: false, controlled2Open: false, controlled3Open: false, controlled4Open: false };
    render(){
        return (
            <div style={{ paddingLeft: 30 }}>
                <div className="row">
                    <div className="col-xs-6">
                        <span>UNCONTROLLED</span><br/>
                        <ButtonDropdown>
                            <button className="btn btn-default">Out of the box</button>
                            <div>
                                <h1>Hello</h1>
                            </div>
                        </ButtonDropdown>
                        <br /><br />
                        <ButtonDropdown>
                            <DummyButton></DummyButton>
                            <div>
                                <h1>Hello</h1>
                            </div>
                        </ButtonDropdown>
                        <br /><br />
                        <div className="btn-group"> {/*cheap hack to get this to display correctly - since we added the clean option*/}
                            <ButtonDropdown clean={true}>
                                <button className="btn btn-default">Out of the box + clean</button>
                                <div>
                                    <h1>Hello</h1>
                                </div>
                            </ButtonDropdown>
                        </div>
                        <br /><br />
                        <ButtonDropdown data-foo="1" className="blue" style={{ width: '400px', backgroundColor: 'red' }}>
                            <button data-blah="2" className="btn btn-default">Out of the box styling + blue css + data-</button>
                            <div data-lala="3">
                                <h1>Hello</h1>
                            </div>
                        </ButtonDropdown>
                        <br /><br />
                        <ButtonDropdown>
                            <button onClick={() => console.log('HELLO WORLD on toggle item')} className="btn btn-default">click handler on toggle button respected</button>
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
                            <button className="btn btn-default red"><h4>Some styling + css class</h4><i className="fa fa-fw fa-tag"></i></button>
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
                    </div>
                    <div className="col-xs-6">
                        CONTROLLED
                        <br/><br/>
                        <ButtonDropdown open={false}>
                            <button className="btn btn-default">Never open</button>
                            <div>
                                <h1>Hello</h1>
                            </div>
                        </ButtonDropdown>
                        <br/><br/>
                        <ButtonDropdown ignoreContentClick={true} onToggle={() => this.setState({ controlled1Open: !this.state.controlled1Open })} open={this.state.controlled1Open}>
                            <button className="btn btn-default">Ignore content click respected in controlled mode</button>
                            <div>
                                <button className="btn btn-primary">Nothing</button>
                                <button onClick={() => this.setState({ controlled1Open: false })} className="btn btn-danger">Close</button>
                            </div>
                        </ButtonDropdown>
                        <br/><br/>
                        <ButtonDropdown ignoreContentClick={true} deferDropdownRendering={true} onToggle={() => this.setState({ controlled2Open: !this.state.controlled2Open })} open={this.state.controlled2Open}>
                            <button className="btn btn-default">Ignore content click & deferred dropdown respected in controlled mode</button>
                            <div>
                                <button className="btn btn-primary">Nothing</button>
                                <button onClick={() => this.setState({ controlled2Open: false })} className="btn btn-danger">Close</button>
                            </div>
                        </ButtonDropdown>
                        <br/><br/>
                        <ButtonDropdown open={this.state.controlled3Open}>
                            <button onClick={() => this.setState({ controlled3Open: true })} className="btn btn-default">Toggle button to open, red button to close. ONLY</button>
                            <div>
                                <button className="btn btn-primary">Nothing</button>
                                <button onClick={() => this.setState({ controlled3Open: false })} className="btn btn-danger">Close</button>
                            </div>
                        </ButtonDropdown>
                        <br/><br/><br />
                        <div className="btn-group"> {/*cheap hack to get this to display correctly - since we added the clean option*/}
                            <ButtonDropdown clean={true} open={this.state.controlled4Open} className="foo">
                                <button onClick={() => this.setState({ controlled4Open: true })} className="btn btn-default">Toggle button to open, red button to close ONLY + clean + custom css class</button>
                                <div>
                                    <button className="btn btn-primary">Nothing</button>
                                    <button onClick={() => this.setState({ controlled4Open: false })} className="btn btn-danger">Close</button>
                                </div>
                            </ButtonDropdown>
                        </div>
                        <br/><br/><br />
                        <ButtonDropdown open={true}>
                            <button className="btn btn-default">Always open</button>
                            <div>
                                <h1>Hello</h1>
                            </div>
                        </ButtonDropdown>
                    </div>
                </div>

            </div>
        );
    }
}


render(<TestCases />, document.getElementById('home'));


//bound in dom 0 handler in default.htm - to test unMount events
window.clearNavBar = function(){
    render(<div>Gone</div>, document.getElementById('home'));
};

export default null;