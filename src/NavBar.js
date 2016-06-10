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
        nextSibling.classList.remove('in');

        console.log('clientHeight === ', clientHeight);
        console.log('offsetHeight === ', offsetHeight);
        console.log('scrollHeight === ', scrollHeight);
        //this.setState({ collapsed: !this.state.collapsed });
    }
    heightReady(val){
        this.setState({ heightExpanded: val > 5 });
        console.log('this.state.heightExpanded', this.state.heightExpanded);
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
                    <div className={"collapse navbar-collapse " + (this.state.collapsed ? '' : 'in')}>
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
