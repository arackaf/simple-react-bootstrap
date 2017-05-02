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
            tabs = children.filter(c => c.type == Tab),
            {headerClassname = '', headerStyle = {}} = this.props;

        return (            
            <RawTabs tab={this.props.tab} onChangeTab={this.props.onChangeTab} defaultTab={this.state.defaultTab}>
                {({TabLink, TabHeader, TabPane}) => (
                    <div>
                        <ul className={'nav nav-tabs ' + headerClassname} style={headerStyle}>
                            {tabs.map((tab, i) => { 
                                let {name, className = '', paneProps, caption, ...rest} = tab.props,
                                    id = name || i;
                                return (
                                    <TabHeader {...rest} key={id} tab={id} render={({isActive}) => 
                                        <li {...rest} className={(className || '') + ' ' + (isActive ? ' active ' : '')}>
                                            <TabLink tab={tab.props.name || i}>{caption}</TabLink>
                                        </li>
                                    } />
                                )
                            })}
                        </ul>
                        <div className='tab-content'>
                            {tabs.map((tab, i) => {
                                let {name, className = '', paneProps = {}, ...rest} = tab.props,
                                    {classNamePane = '', ...restPane} = paneProps,
                                    id = name || i;
                                return (
                                    <TabPane key={id} tab={id} render={({isActive}) => (
                                        <div {...restPane} className={classNamePane + ' tab-pane ' + (isActive ? ' active in ' : '')}>
                                            {tab.props.children}
                                        </div>
                                    )} />
                                );
                            })}
                        </div>
                    </div>
                )}
            </RawTabs>
        );
    }
}