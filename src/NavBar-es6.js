import React from 'react';

const spreadClassNames = (userClassName, baseCssClasses) => `${baseCssClasses || ''} ${userClassName || ''}`;

const NavBarForm = props =>
    <form onSubmit={evt => evt.preventDefault()} className={'navbar-form ' + (props.pullLeft ? ' pull-left ' : '') + (props.pullRight ? ' pull-right ' : '')}>
        {props.children}
    </form>;

const NavBarBrand = props => React.cloneElement(props.children, { className: 'navbar-brand', key: 'nav-bar-brand' });

const NavBarToggle = props =>
    <button { ...props } type="button" className="navbar-toggle collapsed">
        <span className="sr-only">Toggle navigation</span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
    </button>;

const NavBarHeader = props =>
    <div className="navbar-header">
        { props.children }
    </div>;

const NavBarItem = props =>
    <li active={props.active}><a href={props.href}>{props.children}</a></li>;

class NavBarDropdown extends React.Component {
    constructor(){
        super();
        this.state = { open: false };

        this.handleOutsideClick = evt => {
            let element = evt.target;
            do {
                if (element.classList && element.classList.contains('dropdown-toggle')){
                    return; //let the native handler take it.
                }
            } while (element = element.parentNode);

            this.setState({ open: false });
        };

        document.addEventListener('click', this.handleOutsideClick);
    }
    componentWillUnmount(){
        document.removeEventListener('click', this.handleOutsideClick);
    }
    toggle(){
        this.setState({open: !this.state.open});
    }
    render() {
        let props = this.props,
            { className, style, ...rest } = props;

        return (
            <li className={'dropdown ' + (this.state.open ? 'open' : '')}>
                <a className={spreadClassNames(className, 'dropdown-toggle')} style={style || {}} onClick={() => this.toggle()} { ...rest }>{props.text} <span className="caret"></span></a>
                <ul className="dropdown-menu">
                    {props.children}
                </ul>
            </li>
        );
    }
}

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
    render(){
        let header = this.props.children.find(c => c.type === NavBarHeader),
            toggle = header ? header.props.children.find(c => c.type === NavBarToggle) : null,
            toggleIndex = toggle ? header.props.children.indexOf(toggle) : -1,
            navSubItems = this.props.children.filter(filterValidNavSubItems);

        if (toggleIndex >= 0){
            header.props.children[toggleIndex] = React.cloneElement(toggle, { onClick: this.toggleMobileCollapse.bind(this), key: 'nav-bar-toggle' });
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
