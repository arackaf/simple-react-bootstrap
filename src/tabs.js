import React, {Component, Children, cloneElement} from 'react';
import {render} from 'react-dom';

import RawTabs from 'react-raw-tabs';
export {RawTabs};


export class Tab extends Component {
    render() {
        return null;
    }
}

export default class Tabs extends Component {
    tabSelect = name => this.setState({currentTab: name});

    constructor(props) {
        super(props);

        let firstTab = Children.toArray(this.props.children)[0],
            defaultTab = this.props.defaultTab || (firstTab && firstTab.tab) || 0;

        this.state = { defaultTab };
    }

    render() {
        let children = Children.toArray(this.props.children),
            tabs = children.filter(c => c.type == Tab);

        return (            
            <RawTabs defaultTab={this.state.defaultTab}>
                {({TabLink, TabHeader, TabPane}) => (
                    <div>
                        <ul className='nav nav-tabs'>
                            {tabs.map((tab, i) => 
                                <TabHeader tab={tab.props.name || i} render={({isActive}) => 
                                    <li className={(tab.props.className || '') + ' ' + (isActive ? ' active ' : '')}>
                                        <TabLink tab={tab.props.name || i}>{tab.props.caption}</TabLink>
                                    </li>
                                } />
                            )}
                        </ul>
                        <div className='tab-content'>
                            {tabs.map((tab, i) => 
                                <TabPane tab={tab.props.name || i} render={({isActive}) => (
                                    <div className={'tab-pane ' + (isActive ? ' active in ' : '')}>
                                        {tab.props.children}
                                    </div>
                                )} />
                            )}
                        </div>
                    </div>
                )}
            </RawTabs>
        );
    }
}