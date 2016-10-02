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

        if (!Array.isArray(children)){
            throw 'Error - at least two children should be passed: a toggle, and dropdown menu, at a minimum'
        }

        let toggleUnadjusted,
            contentUnadjusted,
            toggleClasses = '',
            contentClasses = '';

        if (children.length === 2){
            toggleUnadjusted = children[0];
            contentUnadjusted = children[1];

            toggleClasses = ' dropdown-toggle ';
            contentClasses = ' dropdown-menu  ';
        } else {
            toggleUnadjusted = children.find(({ props: { className = '' } = {} }) => /\bdropdown-toggle\b/.test(className));
            contentUnadjusted = children.find(({ props: { className = '' } = {} }) => /\bdropdown-menu\b/.test(className));
        }
			
        let toggleClick = toggleUnadjusted.props.onClick || this.toggle;
        let toggle = React.cloneElement(toggleUnadjusted, {
            className: toggleClasses + (toggleUnadjusted.props.className || ''),
            onClick: toggleClick,
            ref: el => this.toggleBtn = el
        });

        let content = React.cloneElement(contentUnadjusted, {
            className: contentClasses + (contentUnadjusted.props.className || ''),
            ref: el => this.contentMenu = el
        });

        //simple case
        if (children.length === 2) {
            return createElement(
                containerElementType,
                {className: className + ' btn-group ' + (this.state.open ? 'open' : ''), ...rest},
                toggle,
                (!this.props.deferDropdownRendering || this.state.open) ? content : null
            );
        } else {
            let childrenToUse = [...children];
            childrenToUse.splice(childrenToUse.indexOf(toggleUnadjusted), 1, toggle);
            childrenToUse.splice(childrenToUse.indexOf(contentUnadjusted), 1, content);

            return createElement(
                containerElementType,
                {className: className + ' btn-group ' + (this.state.open ? 'open' : ''), ...rest},
                ...childrenToUse
            );
        }
    }
}

export default ButtonDropdown;