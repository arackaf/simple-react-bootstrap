import React, {Component, Children} from 'react';
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

export class TabHeader extends Component {
    render() {
        return (
            <div>
                
            </div>
        );
    }
}

export default class Tabs extends Component {
    state = {currentTab: ''};
    tabClick = name => this.setState({currentTab: name});

    render() {
        let tabs = Children.toArray(this.props.children);
        
        return (
            <div>
                <ul>
                    {tabs.map(t => <li>{t.renderHeader()}</li>)}
                </ul>                
            </div>
        );
    }
}