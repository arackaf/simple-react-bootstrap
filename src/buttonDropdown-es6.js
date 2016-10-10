import React, { Component, createElement } from 'react';

class ButtonDropdown extends Component {
	state = { open: false };
	documentClick = evt => {
		if (this.toggleBtn && this.toggleBtn.contains(evt.target)) return;

        let isOpen = typeof this.props.open !== 'undefined' ? this.props.open : this.state.open;

		if (isOpen){
			if (this.props.ignoreContentClick){
				if (this.contentMenu && this.contentMenu.contains(evt.target)) return;
			}

            if (this.props.onToggle){
                this.props.onToggle(evt);
            } else {
                this.toggle();
            }
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
        let { children, className = '', containerElementType = 'div', ignoreContentClick, deferDropdownRendering, onToggle, open, clean, ...rest } = this.props;

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
            toggleUnadjusted = children.find(child => child && child.props && /\bdropdown-toggle\b/.test(child.props.className));
            contentUnadjusted = children.find(child => child && child.props && /\bdropdown-menu\b/.test(child.props.className));
        }

        let rootCssToAdd = clean ? '' : ' btn-group ';
        let toggle;
        if (toggleUnadjusted) {
            //when the toggle button is clicked, click THIS method, in addition to any onClick method supplied by the user. Do not call regular toggle method in controlled mode
            let rootToggleClick = this.props.onToggle || (typeof this.props.open === 'undefined' ? this.toggle : ()=>{});
            let toggleClick = toggleUnadjusted.props.onClick ? evt => { toggleUnadjusted.props.onClick(); rootToggleClick(evt); } : rootToggleClick;
            toggle = React.cloneElement(toggleUnadjusted, {
                className: toggleClasses + (toggleUnadjusted.props.className || ''),
                onClick: toggleClick,
                ref: el => this.toggleBtn = el
            });
        }

        let content;
        if (contentUnadjusted) {
            content = React.cloneElement(contentUnadjusted, {
                className: contentClasses + (contentUnadjusted.props.className || ''),
                ref: el => this.contentMenu = el
            });
        }

        let isOpen = typeof this.props.open !== 'undefined' ? this.props.open : this.state.open,
            classToAdd = [className, rootCssToAdd, (isOpen ? 'open' : null)].filter(s => s).join(' ');

        //simple case
        if (children.length === 2) {
            return createElement(
                containerElementType,
                {className: classToAdd, ...rest},
                toggle,
                (!this.props.deferDropdownRendering || isOpen) ? content : null
            );
        } else {
            let childrenToUse = [...children];
            if (toggleUnadjusted){
                childrenToUse.splice(childrenToUse.indexOf(toggleUnadjusted), 1, toggle);
            }
            if (contentUnadjusted) {
                childrenToUse.splice(childrenToUse.indexOf(contentUnadjusted), 1, (!this.props.deferDropdownRendering || isOpen) ? content : null);
            }

            return createElement(
                containerElementType,
                {className: classToAdd, ...rest},
                ...childrenToUse
            );
        }
    }
}

export default ButtonDropdown;