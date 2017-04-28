import React, {Component, Children, cloneElement} from 'react';
import {render} from 'react-dom';

import Tabs, {Tab} from '../src/tabs';


class CustomHeadB extends Component {
    render() {
        return (
            <span style={{color: 'red'}} onClick={this.props.tabSelect}>Custom B</span>
        );
    }
}

class TestTabs extends Component {
    render() {
        return (
            <div style={{margin: '30px'}}>

                <div className="row">
                    <div className="col-xs-3">
                        Names no default - nothing selected
                        <Tabs>
                            <Tab name='a' caption='A'>
                                This is content a
                            </Tab>
                            <Tab name='b' caption='B'>
                                This is content b
                            </Tab>
                            <Tab name='c' caption='C'>
                                This is content c
                            </Tab>
                        </Tabs>
                    </div>
                    
                    <div className="col-xs-3">
                        Default to b
                        <Tabs defaultTab='b'>
                            <Tab name='a' caption='A'>
                                This is content a
                            </Tab>
                            <Tab name='b' caption='B'>
                                This is content b
                            </Tab>
                            <Tab name='c' caption='C'>
                                This is content c
                            </Tab>
                        </Tabs>
                    </div>

                    <div className="col-xs-3">
                        No names
                        <Tabs>
                            <Tab caption='A'>
                                This is content a
                            </Tab>
                            <Tab caption='B'>
                                This is content b
                            </Tab>
                            <Tab caption='C'>
                                This is content c
                            </Tab>
                        </Tabs>
                    </div>

                    <div className="col-xs-3">
                        No names Default to b
                        <Tabs defaultTab='1'>
                            <Tab caption='A'>
                                This is content a
                            </Tab>
                            <Tab caption='B'>
                                This is content b
                            </Tab>
                            <Tab caption='C'>
                                This is content c
                            </Tab>
                        </Tabs>
                    </div>

                    <div className="col-xs-12">
                        <br />
                        <br />
                    </div>
                    <div className="col-xs-3">
                        No names Default to b - numeric
                        <Tabs defaultTab={1}>
                            <Tab caption='A'>
                                This is content a
                            </Tab>
                            <Tab caption='B'>
                                This is content b
                            </Tab>
                            <Tab caption='C'>
                                This is content c
                            </Tab>
                        </Tabs>
                    </div>
                    
                    <div className="col-xs-3">

                    </div>

                    <div className="col-xs-3">

                    </div>

                    <div className="col-xs-3">

                    </div>
                </div>

            </div>
        );
    }
}

render(<TestTabs />, document.getElementById('home'));


export default null;