import React, {Component, Children, cloneElement} from 'react';

export class TabHeader extends Component {
    tabClick = () => {
        this.props.tabSelect(this.props.name);
    }
    render() {
        return (
            <li>
                <a onClick={this.tabClick}>{this.props.caption}</a>
            </li>
        );
    }
}

export class TabsHeader extends Component {
    render() {
        let {children} = this.props;
        return (
            <ul className='nav nav-tabs'>
                {Children.map(children, item => cloneElement(item, {tabSelect: this.props.tabSelect}))}
            </ul>
        );
    }
}

export class TabsContent extends Component {
    render() {
        let {children, active} = this.props;
        return (
            <div className='tab-content'>
                {Children.map(children, item => <div className={(item.props.className || 'tab-pane') + (active ? ' active' : '')}></div>)}
            </div>
        );
    }
}

export class Tab extends Component {
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
    state = {currentTab: this.props.defaultTab};
    tabSelect = name => this.setState({currentTab: name});

    render() {
        let children = Children.toArray(this.props.children),
            header = children.find(c => c.type == TabsHeader),
            content = children.find(c => c.type == TabsContent),
            tabs = content ? content.props.children : children.filter(c => c.type == Tab);

        return (
            <div>
                {header 
                    ? cloneElement(header, {currentTab: this.state.currentTab, tabSelect: this.tabSelect}) 
                    : <TabHeader currentTab={this.state.currentTab} tabSelect={tabSelect}>
                          {tabs.map(t => <TabHeader caption={t.caption} name={t.name} />)}
                      </TabHeader>
                }
                {content
                    ? cloneElement(content, {currentTab: this.state.currentTab}) 
                    : <TabsContent currentTab={this.state.currentTab}>{tabs}</TabsContent>
                }
            </div>
        );
    }
}