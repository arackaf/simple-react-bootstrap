import React, { Component } from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const spreadClassNames = (userClassName, baseCssClasses) => `${baseCssClasses || ""} ${userClassName || ""}`;

const ModalHeader = props => {
  let { className = "", children, ...rest } = props;
  return (
    <div className={"modal-header " + className} {...rest}>
      {props.children}
    </div>
  );
};

const ModalFooter = props => {
  let { className = "", children, ...rest } = props;
  return (
    <div className={"modal-footer " + className} {...rest}>
      {props.children}
    </div>
  );
};

const ModalBody = props => {
  let { className = "", children, ...rest } = props;
  return (
    <div className={"modal-body " + className} {...rest}>
      {props.children}
    </div>
  );
};

const ESC_KEY = 27;

const currentModals = [];

window.addEventListener("keydown", evt => {
  let key = evt.keyCode || evt.which;

  if (key == ESC_KEY) {
    if (currentModals.length) {
      currentModals[currentModals.length - 1].props.onHide();
    }
  }
});

let __uuid = 1;

function closeTopModal() {
  let modal = currentModals[currentModals.length - 1];
  if (modal && modal.props.onHide) {
    modal.props.onHide();
  }
}

function handleModalWindowClick(evt) {
  if (evt.target == evt.currentTarget || $(evt.target.parentElement).attr("aria-label") === "Close") {
    evt.preventDefault();
    evt.stopPropagation();
    closeTopModal();
  }
}

export default class Modal extends React.Component {
  uuid = __uuid++;
  componentDidMount() {
    if (this.props.show) {
      this.renderModal();
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.show && this.props.show) {
      this.renderModal();
    } else if (prevProps.show && !this.props.show) {
      currentModals.length = 0;
      refreshModal();
      //currentModals.remove(this);
    }
  }
  renderModal() {
    currentModals.push(this);
    refreshModal();
  }
  componentWillUnmount() {
    currentModals.remove(this);
  }
  render() {
    return null;
  }
}

class ModalRaw extends React.Component {
  render() {
    let { className, style = {}, manual, children, ...rest } = this.props;
    className = className.replace(/\bfade\b/, "");
    return (
      <div
        onClick={handleModalWindowClick}
        className={spreadClassNames(className, "modal animate")}
        style={{ ...style, display: "block" }}
        {...rest}
        role="dialog"
      >
        {manual ? (
          children
        ) : (
          <div className="modal-dialog">
            <div className="modal-content">{children}</div>
          </div>
        )}
      </div>
    );
  }
}

Modal.Body = ModalBody;
Modal.Header = ModalHeader;
Modal.Footer = ModalFooter;

class ModalCollection extends Component {
  render() {
    return (
      <div>
        <TransitionGroup>
          {currentModals.map((modal, i) => {
            let { children, ...rest } = modal.props;

            return (
              <CSSTransition key={`modal-key-${modal.uuid}`} timeout={300} classNames="modal">
                <ModalRaw {...rest}>{children}</ModalRaw>
              </CSSTransition>
            );
          })}
        </TransitionGroup>

        {currentModals.length ? (
          <div key="modal-backdrop" onClick={closeTopModal} className="modal-backdrop simple-react-modal-backdrop fade in" />
        ) : null}
      </div>
    );
  }
}

const modalRoot = document.createElement("div");
modalRoot.id = "__simple-react-bootstrap-modal-container";
document.body.appendChild(modalRoot);

refreshModal();
function refreshModal() {
  render(<ModalCollection />, modalRoot);
}
