import React, {Component, Children, cloneElement} from 'react';

export class TabHeader extends Component {
    tabClick = () => {
        this.props.tabSelect(this.props.name);
    }
    render() {
        let {active, className = ''} = this.props;
        return (
            <li className={className + ' ' + (active ? ' active ' : '')}>
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
                {children}
            </div>
        );
    }
}

export class Tab extends Component {
    render() {
        let {active, className = '', children} = this.props;
        return (
            <div className={'tab-pane ' + className + (active ? ' active in ' : '')}>
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
                    ? cloneElement(header, {tabSelect: this.tabSelect}, 
                        React.Children.map(header.props.children, t => cloneElement(t, {active: this.state.currentTab == t.props.name}))) 
                    : <TabsHeader currentTab={this.state.currentTab} tabSelect={tabSelect}>
                          {tabs.map(t => <TabHeader active={this.state.currentTab == t.name} caption={t.caption} name={t.name} />)}
                      </TabsHeader>
                }
                {content
                    ? cloneElement(content, {currentTab: this.state.currentTab},
                        React.Children.map(content.props.children, t => cloneElement(t, {active: this.state.currentTab == t.props.name})))
                    : <TabsContent currentTab={this.state.currentTab}>
                        {tabs.map(t => cloneElement(t, {active: this.state.currentTab == t.name}))}
                      </TabsContent>
                }
            </div>
        );
    }
}