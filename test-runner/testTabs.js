import React, {Component, Children, cloneElement} from 'react';
import {render} from 'react-dom';

import Tabs, {Tab} from '../src/tabs';



class TestTabs extends Component {
    state = { controlledA: 'a', controlledB: 'b', controlledC: '1', controlledD: 1 }
    setA = val => this.setState({controlledA: val});
    setB = val => this.setState({controlledB: val});
    setC = val => this.setState({controlledC: val});
    setD = val => this.setState({controlledD: val});

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
                        Controlled - never change
                        <Tabs tab={this.state.controlledA}>
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
                        Controlled - does change
                        <Tabs tab={this.state.controlledB} onChangeTab={this.setB}>
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
                        Controlled - mirrors prior - does change - NO default
                        <Tabs tab={this.state.controlledB} onChangeTab={this.setB} defaultTab='0'>
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
                        Controlled - default to b
                        <Tabs tab={this.state.controlledC} onChangeTab={this.setC}>
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
                        Controlled - mirror prior - default to b
                        <Tabs tab={this.state.controlledC} onChangeTab={this.setC} defaultTab='2'>
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
                        Controlled - default to b
                        <Tabs tab={this.state.controlledD} onChangeTab={this.setD}>
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
                        Controlled - mirror prior - default to b
                        <Tabs tab={this.state.controlledD} onChangeTab={this.setD} defaultTab={2}>
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
                        Blue background
                        <Tabs headerClassname='blue'>
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
                        Red background
                        <Tabs headerStyle={{backgroundColor: 'red'}}>
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
                        Tab A head red, B head blue
                        <Tabs>
                            <Tab name='a' caption='A' className='red' style={{backgroundColor: 'red'}}>
                                This is content a
                            </Tab>
                            <Tab name='b' caption='B' className='blue' style={{backgroundColor: 'blue'}}>
                                This is content b
                            </Tab>
                            <Tab name='c' caption='C'>
                                This is content c
                            </Tab>
                        </Tabs>
                    </div>

                    <div className="col-xs-3">
                        Tab A red, B blue - both head AND body
                        <Tabs>
                            <Tab name='a' caption='A' className='red' style={{backgroundColor: 'red'}} paneProps={{className: 'red', style: {backgroundColor: 'red'} }}>
                                This is content a
                            </Tab>
                            <Tab name='b' caption='B' className='blue' style={{backgroundColor: 'blue'}} paneProps={{className: 'blue', style: {backgroundColor: 'blue'} }}>
                                This is content b
                            </Tab>
                            <Tab name='c' caption='C'>
                                This is content c
                            </Tab>
                        </Tabs>
                    </div>                    

                </div>

            </div>
        );
    }
}

render(<TestTabs />, document.getElementById('home'));


export default null;