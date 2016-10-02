import React, { Component, createElement } from 'react';

class ButtonDropdown extends Component {
	state = { open: false };
	documentClick = evt => {
		if (this.toggleBtn.contains(evt.target)) return;
		if (this.state.open){
			if (this.props.ignoreContentClick){
				if (this.contentMenu.contains(evt.target)) return;
			}

			this.toggle();
		}
	};
    toggle = () => this.setState({ open: !this.state.open });
    componentDidMount(){
        document.addEventListener('click', this.documentClick);
    }
	componentWillUnmount(){
		document.removeEventListener('click', this.documentClick);
	}
    render(){
        let { children, className = '', containerElementType = 'div', ignoreContentClick, deferDropdownRendering, ...rest } = this.props;

        if (!Array.isArray(children) || children.length !== 2){
            throw 'Error - exactly two children should be passed, a toggle, and dropdown menu'
        }

        let toggleUnadjusted = children[0],
            contentUnadjusted = children[1];
			
        let toggleClasses = 'dropdown-toggle ' + (toggleUnadjusted.props.className || ''),
            toggleClick = toggleUnadjusted.props.onClick || this.toggle;
        let toggle = React.cloneElement(toggleUnadjusted, {
            className: toggleClasses,
            onClick: toggleClick,
            ref: el => this.toggleBtn = el
        });

        let content = React.cloneElement(contentUnadjusted, {
            className: 'dropdown-menu ' + (contentUnadjusted.props.className || ''),
            ref: el => this.contentMenu = el
        });

        return createElement(
            containerElementType,
            { className: className + ' btn-group ' + (this.state.open ? 'open' : ''), ...rest },
            toggle,
            (!this.props.deferDropdownRendering || this.state.open) ? content : null
        )
    }
}

export default ButtonDropdown;