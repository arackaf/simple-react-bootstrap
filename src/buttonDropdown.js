import React, { Component, createElement } from "react";
import { findDOMNode } from "react-dom";

class ButtonDropdown extends Component {
  state = { open: false };
  documentClick = evt => {
    let toggleBtnDomNode;
    if (this.toggleBtn) {
      if (this.toggleBtn instanceof Component) {
        toggleBtnDomNode = findDOMNode(this.toggleBtn);
      } else {
        toggleBtnDomNode = this.toggleBtn;
      }
    }

    if (toggleBtnDomNode && toggleBtnDomNode.contains(evt.target)) return;

    let isOpen = typeof this.props.open !== "undefined" ? this.props.open : this.state.open;
    let { keepOpenIfItemClickedNoLongerInDocument } = this.props;

    if (isOpen) {
      if (this.props.ignoreContentClick) {
        let contentMenuNode;
        if (this.contentMenu) {
          if (this.contentMenu instanceof Component) {
            contentMenuNode = findDOMNode(this.contentMenu);
          } else {
            contentMenuNode = this.contentMenu;
          }
        }

        if (contentMenuNode && contentMenuNode.contains(evt.target)) return;
        //adding for a specific use case that may not even be reproducable depending on circumstance.  Keeping undocumented for now.
        if (keepOpenIfItemClickedNoLongerInDocument && !document.contains(evt.target)) return;
      }

      if (this.props.onToggle) {
        this.props.onToggle(evt);
      } else {
        this.toggle();
      }
    }
  };
  toggle = () => this.setState({ open: !this.state.open });
  componentDidMount() {
    document.addEventListener("click", this.documentClick);
  }
  componentWillUnmount() {
    document.removeEventListener("click", this.documentClick);
  }
  render() {
    let {
      children,
      className = "",
      containerElementType = "div",
      disabled = false,
      ignoreContentClick,
      deferDropdownRendering,
      onToggle,
      open,
      clean,
      keepOpenIfItemClickedNoLongerInDocument,
      ...rest
    } = this.props;

    if (!Array.isArray(children)) {
      throw "Error - at least two children should be passed: a toggle, and dropdown menu, at a minimum";
    }

    let toggleUnadjusted,
      contentUnadjusted,
      toggleClasses = "",
      contentClasses = "";

    if (children.length === 2) {
      toggleUnadjusted = children[0];
      contentUnadjusted = children[1];

      toggleClasses = " dropdown-toggle ";
      contentClasses = " dropdown-menu  ";
    } else {
      toggleUnadjusted = children.find(child => child && child.props && /\bdropdown-toggle\b/.test(child.props.className));
      contentUnadjusted = children.find(child => child && child.props && /\bdropdown-menu\b/.test(child.props.className));
    }

    let rootCssToAdd = clean ? "" : " btn-group ";
    let toggle;
    if (toggleUnadjusted) {
      //when the toggle button is clicked, click THIS method, in addition to any onClick method supplied by the user. Do not call regular toggle method in controlled mode
      let rootToggleClick = this.props.onToggle || (typeof this.props.open === "undefined" ? this.toggle : () => {});
      let toggleClick = toggleUnadjusted.props.onClick
        ? evt => {
            if (disabled) return;
            toggleUnadjusted.props.onClick();
            rootToggleClick(evt);
          }
        : !disabled
          ? rootToggleClick
          : () => {};
      toggle = React.cloneElement(toggleUnadjusted, {
        className: toggleClasses + (toggleUnadjusted.props.className || ""),
        onClick: toggleClick,
        ref: el => (this.toggleBtn = el)
      });
    }

    let content;
    if (contentUnadjusted) {
      content = React.cloneElement(contentUnadjusted, {
        className: contentClasses + (contentUnadjusted.props.className || ""),
        ref: el => (this.contentMenu = el)
      });
    }

    let isOpen = typeof this.props.open !== "undefined" ? this.props.open : this.state.open,
      classToAdd = [className, rootCssToAdd, isOpen ? "open" : null].filter(s => s).join(" ");

    //simple case
    if (children.length === 2) {
      return createElement(
        containerElementType,
        { className: classToAdd, ...rest },
        React.cloneElement(toggle, { disabled }),
        !this.props.deferDropdownRendering || isOpen ? content : null
      );
    } else {
      let childrenToUse = [...children];
      if (toggleUnadjusted) {
        childrenToUse.splice(childrenToUse.indexOf(toggleUnadjusted), 1, toggle);
      }
      if (contentUnadjusted) {
        childrenToUse.splice(childrenToUse.indexOf(contentUnadjusted), 1, !this.props.deferDropdownRendering || isOpen ? content : null);
      }

      return createElement(containerElementType, { className: classToAdd, ...rest }, ...childrenToUse);
    }
  }
}

export default ButtonDropdown;
