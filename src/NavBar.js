import Collapse from 'react-collapse';
import React from 'react';

document.onclick = function(evt){
};

const NavBarHeader = props =>
    <div className="navbar-header">
        { props.children }
    </div>;

const NavBarBrand = props => React.cloneElement(props.children, { className: 'navbar-brand' });

const NavBarToggle = props =>
    <button { ...props } type="button" className="navbar-toggle collapsed">
        <span className="sr-only">Toggle navigation</span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
    </button>;

const NavBarItem = props =>
    <li { ...props }>{props.children}</li>;

const Nav = props =>
    <ul { ...props } className="nav navbar-nav">
        {props.children}
    </ul>;

class NavBar extends React.Component{
    constructor(){
        super();
        this.state = { collapsed: true, heightExpanded: false };
    }
    toggleMobileCollapse(evt){
        let parent = evt.target.parentNode,
            nextSibling = parent.nextSibling;

        nextSibling.classList.add('in');
        let clientHeight = nextSibling.clientHeight;
        let offsetHeight = nextSibling.offsetHeight;
        let scrollHeight = nextSibling.scrollHeight;
        //nextSibling.classList.remove('in');

        //console.log('clientHeight === ', clientHeight);
        //console.log('offsetHeight === ', offsetHeight);
        //console.log('scrollHeight === ', scrollHeight);

        //remove collapse, add collapsing
        this.beginAnimation(20, offsetHeight, 'open');
        //this.setState({ collapsed: !this.state.collapsed });
    }
    beginAnimation(animationSteps, animationTarget){
        this.setState({ animationSteps, animationTarget, currentAnimationStep: 0, currentAnimationValue: 0, animating: true });

        setTimeout(() => this.step(), 50);
    }
    step(){
        let currentAnimationStep = this.state.currentAnimationStep,
            animationSteps = this.state.animationSteps,
            remainingSteps = animationSteps - currentAnimationStep,
            remainingAnimationChanges = this.state.animationTarget - this.state.currentAnimationValue,
            stepValue = remainingAnimationChanges / remainingSteps,
            currentAnimationValue = remainingSteps > 1 ? this.state.currentAnimationValue + stepValue : this.state.animationTarget;

        this.setState({ currentAnimationValue, currentAnimationStep: this.state.currentAnimationStep + 1 });
        console.log('currentAnimationValue: ', this.state.currentAnimationValue);
        if (remainingSteps > 1){
            setTimeout(() => this.step(), 50);
        } else {
            this.setState({ animating: false, animationSteps: null, animationTarget: null, currentAnimationStep: null, expanded: true });
        }
    }
    render(){
        //let children = this.props.children;
        //let count = children.filter(c => c.type === NavBarItem).length;
        let header = this.props.children.find(c => c.type === NavBarHeader),
            toggle = header ? header.props.children.find(c => c.type === NavBarToggle) : null,
            toggleIndex = toggle ? header.props.children.indexOf(toggle) : -1,
            navSubItems = this.props.children.filter(filterValidNavSubItems);

        if (toggleIndex >= 0){
            header.props.children[toggleIndex] = React.cloneElement(toggle, { onClick: this.toggleMobileCollapse.bind(this) });
        }

        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    { header || null }
                    <div className={(this.state.animating ? 'collapsing' : ' collapse ') + ' navbar-collapse ' + (this.state.expanded ? ' in ' : '')} style={{ height: this.state.currentAnimationValue }}>
                        { navSubItems }
                    </div>
                </div>
            </nav>
        );
    }
}



NavBar.Nav = Nav;
NavBar.Item = NavBarItem;
NavBar.Header = NavBarHeader;
NavBar.Brand = NavBarBrand;
NavBar.Toggle = NavBarToggle;

function filterValidNavSubItems(item){
    return item.type !== NavBarHeader;
}

export default NavBar;
