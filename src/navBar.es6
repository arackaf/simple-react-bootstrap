import React from 'react';
import ButtonDropdown from './buttonDropdown.js';

const COLLAPSE_TIMEOUT = 355;

const spreadClassNames = (baseCssClasses = '', ...userClasses) => `${baseCssClasses} ${userClasses.join(' ')}`;

const NavBarForm = props => {
    let { className, style, ...rest } = props;

    return (
        <form onSubmit={evt => evt.preventDefault()} className={spreadClassNames(className, 'navbar-form')} style={style} {...rest}>
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
    let { disabled, className, active, href, children, ...rest } = props;

    return (
        <li disabled={!!disabled} className={spreadClassNames(className, !!disabled ? 'disabled' : '', active ? 'active' : '')} { ...rest }><a href={href}>{children}</a></li>
    );
};

const NavBarItemDivider = props => <li role="separator" className="divider"></li>

const NavBarDropdown = props => {
    let { toggleClassName, style, disabled, text, children, ignoreContentClick = false, ...rest } = props;

    return (
        <ButtonDropdown containerElementType="li" clean={true} ignoreContentClick={ignoreContentClick} className={`dropdown ${!!disabled ? 'disabled' : ''}`} disabled={!!disabled}>
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
            }, COLLAPSE_TIMEOUT);
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

            this._pendingAnimationClear = setTimeout(() => this.setState({ collapsing: false, expanded: true, expanding: false }), COLLAPSE_TIMEOUT);
        }
    }
    componentWillUnmount(){
        clearTimeout(this._pendingAnimationClear);
    }
    render(){
        let header = this.props.children.find(c => c.type === NavBarHeader),
            navSubItems = this.props.children.filter(el => el != header);

        if (header) {
            header = React.cloneElement(header, {onClick: this.toggleMobileCollapse.bind(this)});
        }

        let {style, className = '', ...rest} = this.props;

        return (
            <nav className={'navbar navbar-default ' + className} style={style} {...rest}>
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
NavBar.ItemDivider = NavBarItemDivider;
NavBar.Header = NavBarHeader;
NavBar.Brand = NavBarBrand;
NavBar.Toggle = NavBarToggle;
NavBar.Dropdown = NavBarDropdown;
NavBar.Form = NavBarForm;

export default NavBar;
