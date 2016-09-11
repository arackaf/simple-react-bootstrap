import React, { Component } from 'react';



class ButtonDropdown extends Component {
    constructor(){
        super();
        this.state = { open: false };
    }
    toggle = () => this.setState({ open: !this.state.open });
    documentClick = evt => {
        if (this.toggleBtn.contains(evt.target)) return;
        if (this.state.open){
            this.toggle();
        }
    };
    componentDidMount(){
        document.addEventListener('click', this.documentClick);
    }
    render(){
        let { children, className = '', ...rest } = this.props;

        if (!Array.isArray(children) || children.length !== 2){
            throw 'Error - exactly two children should be passed, a toggle, and dropdown menu'
        }

        let toggleUnadjusted = children[0],
            content = children[1];

        let toggleClasses = 'dropdown-toggle ' + toggleUnadjusted.props.className,
            toggleClick = toggleUnadjusted.props.onClick || this.toggle;
        let toggle = React.cloneElement(toggleUnadjusted, {
            className: toggleClasses,
            onClick: toggleClick,
            ref: el => this.toggleBtn = el
        });

        return (
            <div className={className + ' btn-group ' + (this.state.open ? 'open' : '')}>
                {toggle}
                {content}
            </div>
        )
    }
}

export default ButtonDropdown;