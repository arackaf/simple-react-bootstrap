import React, {Component, Children, cloneElement} from 'react';
import {render} from 'react-dom';

import Tabs, {TabsHeader, TabHeader, TabsContent, Tab} from '../src/tabs';

console.log(typeof Tabs, typeof TabsHeader, typeof TabHeader, typeof TabsContent, typeof Tab)

class TestTabs extends Component {
    render() {
        return (
            <div style={{margin: '30px'}}>
                <Tabs>
                    <TabsHeader>
                        <TabHeader caption='A' name='a' />
                        <TabHeader caption='B' name='b' />
                        <TabHeader caption='C' name='c' />
                    </TabsHeader>
                    <TabsContent>
                        <Tab name='a'>
                            This is content a
                        </Tab>
                        <Tab name='b'>
                            This is content b
                        </Tab>
                        <Tab name='c'>
                            This is content c
                        </Tab>
                    </TabsContent>
                </Tabs>
            </div>
        );
    }
}

render(<TestTabs />, document.getElementById('home'));


export default null;