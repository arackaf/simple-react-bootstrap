import React from 'react';
import {render, unmountComponentAtNode} from 'react-dom';

const spreadClassNames = (userClassName, baseCssClasses) => `${baseCssClasses || ''} ${userClassName || ''}`;

const ModalHeader = props => {
    let { className = '', children, ...rest } = props;
    return (
        <div className={"modal-header " + className} {...rest}>
            { props.children }
        </div>
    );
};

const ModalFooter = props => {
    let { className = '', children, ...rest } = props;
    return (
        <div className={"modal-footer " + className} {...rest}>
            { props.children }
        </div>
    );
};

const ModalBody = props => {
    let { className = '', children, ...rest } = props;
    return (
        <div className={"modal-body " + className} {...rest}>
            { props.children }
        </div>
    );
};

const currentModals = [];

const ESC_KEY = 27;

window.addEventListener('keydown', evt => {
    let key = evt.keyCode || evt.which;

    if (key == ESC_KEY){
        if (currentModals.length){
            currentModals[currentModals.length - 1].props.onHide();
        }
    }
});

function removeBackdrop(){
    let backdrop = document.getElementsByClassName('simple-react-modal-backdrop')[0];
    if (!backdrop)return;
    backdrop.classList.remove('simple-react-modal-backdrop');

    let isAnimating = /\bfade\b/.test(backdrop.className);

    if (!isAnimating){
        backdrop.parentNode.removeChild(backdrop)
    } else {
        backdrop.classList.remove('in');
        setTimeout(() => backdrop.parentNode.removeChild(backdrop), 200);
    }
}

let uuid = 1;

class Modal extends React.Component {
    portalState = { exists: false, hasInCssClass: false };
    mergePortalState = (newState, cb) => {
        Object.assign(this.portalState, newState);
        this.renderModal(cb);
    }
    __showingUid = 0;
    __bumpUid = () => this.__showingUid++;
    modalClick = evt => {
        let activeModal = currentModals[currentModals.length - 1];
        if (activeModal === this && evt.target === evt.currentTarget){
            this.props.onHide()
        }
    };
    componentDidMount(){
        this.__div = document.createElement('div');
        this.__div.id = '__simple-react-bootstrap-modal' + (uuid++);
        document.body.appendChild(this.__div);
        this.renderModal();
    }
    initialMount = el => {
        if (el){
            this.modalRef = el;
            if (this.props.show){
                this._showModal();
            }
        }
    }
    componentDidUpdate(prevProps, prevState){
        if (!prevProps.show && this.props.show){
            this._showModal();
        } else if (prevProps.show && !this.props.show){
            this._hideModal();
        } else {
            this.renderModal();
        }
    }
    _showModal(){
        this.__bumpUid();
        let correctUid = this.__showingUid;
        let div = !currentModals.length ? document.createElement('div') : null,
            isAnimating = /\bfade\b/.test(this.modalRef.className);

        if (div) {
            div.classList.add(...['modal-backdrop', 'simple-react-modal-backdrop', (isAnimating ? 'fade' : 'in')]);
        }

        if (isAnimating){
            if (div) {
                document.body.appendChild(div);
            }
            const onNext = cb => window.requestAnimationFrame ? requestAnimationFrame(cb) : setTimeout(cb, 2);

            this.mergePortalState({ exists: true }, () => onNext(() => this.mergePortalState({ hasInCssClass: true })) );
            onNext(() => {
                if (div) {
                    div.classList.add('in');
                }
                document.body.classList.add('modal-open');
            });
            //provide some small delay before this modal is eligible to be closed.  We don't want a double click to open / show the modal.

            setTimeout(() => {
                if (correctUid !== this.__showingUid) return;
                currentModals.push(this);
            }, 200);
        } else {
            if (div) {
                document.body.appendChild(div);
            }
            this.mergePortalState({ exists: true, hasInCssClass: true });
            currentModals.push(this);
            document.body.classList.add('modal-open');
        }
    }
    _hideModal = () => {
        this.__bumpUid();
        let correctUid = this.__showingUid;
        let isAnimating = /\bfade\b/.test(this.modalRef.className);

        if (isAnimating){
            this.mergePortalState({ hasInCssClass: false });
            setTimeout(() => {
                if (correctUid !== this.__showingUid) return;
                this.mergePortalState({ exists: false })
            }, 200);
        } else {
            this.mergePortalState({ hasInCssClass: false, exists: false });
        }

        if (currentModals.length <= 1) { //less than since it may have been closed before modal was activated
            document.body.classList.remove('modal-open');
            removeBackdrop();
        }
        if (currentModals[currentModals.length - 1] == this){
            currentModals.pop();
        }
    }
    render(){
        return <div></div>;
    }
    renderModal(cb) {
        let { children, manual, show, onHide, className, style, ...rest } = this.props;

        render (
            <div ref={this.initialMount} onClick={this.modalClick} className={spreadClassNames(className, 'modal ' + (this.portalState.hasInCssClass ? 'in' : ''))} style={{ ...style, display: this.portalState.exists ? 'block' : '' }} {...rest} role="dialog">
                {manual ? children :
                    <div className="modal-dialog">
                        <div className="modal-content">
                            {children}
                        </div>
                    </div>
                }
            </div>, this.__div, cb
        );
    }
    componentWillUnmount(){
        let index = currentModals.indexOf(this);
        if (this.props.show){
            this._hideModal();
        }
        if (index >= 0){
            currentModals.splice(index, 1);
            if (!currentModals.length){
                removeBackdrop();
            }
        }
        setTimeout(() => {
            unmountComponentAtNode(this.__div);
            setTimeout(() => document.body.removeChild(this.__div), 100);
        }, 1000);
    }
}

Modal.Body = ModalBody;
Modal.Header = ModalHeader;
Modal.Footer = ModalFooter;

export default Modal;