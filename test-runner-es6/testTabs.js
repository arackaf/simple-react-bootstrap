import React, {Component, Children, cloneElement} from 'react';
import { render } from 'react-dom';

import Tabs from '../src/tabs';

export class Tab extends Component {
    tabClick = () => {
        this.props.tabClick(this.props.tabName);
    }
    renderHeader(){
        return (
            <a onClick={this.tabClick}>{this.props.caption}</a>
        )
    }
    render() {
        return null;
    }
}

class TabHeader extends Component {
    render() {
        return (
            <li>
                <a>{this.props.caption}</a>
            </li>
        );
    }
}

export class TabsHeader extends Component {
    render() {
        let {children} = this.props;
        return (
            <ul>
                {Children.map(children, item => cloneElement(item, {tabSelect: this.props.tabSelect}))}
            </ul>
        );
    }
}

export class TabsContent extends Component {
    render() {
        let {children, active} = this.props;
        return (
            <div>
                {Children.map(children, item => <div className={(item.props.className || '') + (active ? ' active' : '')}></div>)}
            </div>
        );
    }
}

class Tab extends Component {
    render() {
        let {active, className = ''} = this.props;
        return (
            <div className={className + (active ? '' : ' active')}>
                {children}
            </div>
        );
    }
}

export default class Tabs extends Component {
    state = {currentTab: ''};
    tabSelect = name => this.setState({currentTab: name});

    render() {
        let children = Children.toArray(this.props.children),
            header = children.find(c => c.type == TabsHeader),
            content = children.find(c => c.type == TabsContent),
            tabs = content ? content.props.children : children.filter(c => c.type == Tab);

        return (
            <div>
                {header ? cloneElement(header, {tabSelect: this.tabSelect}) : <TabHeader tabSelect={tabSelect} />}
                {content 
                    ? cloneElement(content, {currentTab: this.state.currentTab}) 
                    : <TabsContent currentTab={this.state.currentTab}>{tabs}</TabsContent>
                }
            </div>
        );
    }
}