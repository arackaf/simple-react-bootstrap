import React from 'react';
import ButtonDropdown from './buttonDropdown.js';

const spreadClassNames = (userClassName, baseCssClasses) => `${baseCssClasses || ''} ${userClassName || ''}`;

const NavBarForm = props => {
    let { className, style, ...rest } = props;

    return (
        <form onSubmit={evt => evt.preventDefault()} className={spreadClassNames(className, 'navbar-form')}>
            {props.children}
        </form>
    );
};

const NavBarBrand = props => React.cloneElement(props.children, { className: 'navbar-brand', key: 'nav-bar-brand' });

const NavBarToggle = props =>
    <button { ...props } type="button" className="navbar-toggle collapsed">
        <span className="sr-only">Toggle navigation</span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
    </button>;

const NavBarHeader = props =>
    <div className="navbar-header">{
        React.Children.map(props.children, child =>
            child.type === NavBarToggle
                ? React.cloneElement(child, {onClick: props.onClick, key: 'nav-bar-toggle'})
                : child)
    }</div>;

const NavBarItem = props => {
    let { disabled, className, href, children, ...rest } = props;

    return (
        <li disabled={!!disabled} className={spreadClassNames(className, !!disabled ? 'disabled' : '')} { ...rest }><a href={props.href}>{children}</a></li>
    );
};

const NavBarDropdown = props => {
    let { toggleClassName, style, disabled, text, children, ...rest } = props;

    return (
        <ButtonDropdown containerElementType="li" clean={true} className={`dropdown ${!!disabled ? 'disabled' : ''}`} disabled={!!disabled}>
            <a className={spreadClassNames(toggleClassName, 'dropdown-toggle')} style={style || {}} { ...rest }>{text} <span className="caret"></span></a>
            <ul className="dropdown-menu">
                {children}
            </ul>
        </ButtonDropdown>
    );
};

const Nav = props =>
    <ul { ...props } className="nav navbar-nav">
        {props.children}
    </ul>;

class NavBar extends React.Component{
    constructor(){
        super();
        this.state = { collapsed: true, heightExpanded: false, collapseHeight: null };
    }
    toggleMobileCollapse(evt){
        if (this._pendingAnimationClear){
            clearTimeout(this._pendingAnimationClear);
            this._pendingAnimationClear = null;
        }
        if (this.state.expanded || this.state.expanding){
            this.setState({ collapsing: true, collapseHeight: null, expanding: false, expanded: false });
            this._pendingAnimationClear = setTimeout(() => {
                this.setState({ collapsing: false, collapseHeight: null });
                this._cachedHeight = null;
            }, 300);
        } else {

            if (!this._cachedHeight) {
                let currentNode = evt.target,
                    collapseContentToToggle;

                while (currentNode = currentNode.parentNode){
                    if (currentNode.tagName === 'DIV'){
                        collapseContentToToggle = currentNode.nextSibling;
                        break;
                    }
                }

                collapseContentToToggle.style.visibility = 'hidden';
                collapseContentToToggle.classList.add('in');
                let offsetHeight = collapseContentToToggle.offsetHeight;
                collapseContentToToggle.style.visibility = '';
                collapseContentToToggle.classList.remove('in');

                this._cachedHeight = offsetHeight;
            }

            this.setState({ collapsing: true, expanding: true });
            setTimeout(() => this.setState({ collapseHeight: this._cachedHeight }), 2);

            this._pendingAnimationClear = setTimeout(() => this.setState({ collapsing: false, expanded: true, expanding: false }), 300);
        }
    }
    componentWillUnmount(){
        clearTimeout(this._pendingAnimationClear);
    }
    render(){
        let header = this.props.children.find(c => c.type === NavBarHeader),
            navSubItems = this.props.children.filter(filterValidNavSubItems);

        if (header) {
            header = React.cloneElement(header, {onClick: this.toggleMobileCollapse.bind(this)});
        }

        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    { header || null }
                    <div className={(this.state.collapsing ? ' collapsing ' : ' collapse ') + ' navbar-collapse ' + (this.state.expanded ? ' in ' : '')} style={{ height: this.state.collapseHeight || null }}>
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
NavBar.Dropdown = NavBarDropdown;
NavBar.Form = NavBarForm;

function filterValidNavSubItems(item){
    return item.type !== NavBarHeader;
}

export default NavBar;
