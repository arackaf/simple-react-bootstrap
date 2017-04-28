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

                <div>Hello <span>{() => <b>World</b>}</span></div>

                <br /><br /><br />
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

                <br /><br />
            </div>
        );
    }
}

render(<TestTabs />, document.getElementById('home'));


export default null;