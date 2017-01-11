import React from 'react';

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

class Modal extends React.Component {
    state = { exists: false, hasInCssClass: false };
    __showingUid = 0;
    __bumpUid = () => this.__showingUid++;
    modalClick = evt => {
        let activeModal = currentModals[currentModals.length - 1];
        if (activeModal === this && evt.target === evt.currentTarget){
            this.props.onHide()
        }
    };
    componentDidMount(){
        if (this.props.show){
            this._showModal();
        }
    }
    componentDidUpdate(prevProps, prevState){
        if (!prevProps.show && this.props.show){
            this._showModal();
        } else if (prevProps.show && !this.props.show){
            this.__bumpUid();
            let correctUid = this.__showingUid;
            let isAnimating = /\bfade\b/.test(this.modalRef.className);

            if (isAnimating){
                this.setState({ hasInCssClass: false });
                setTimeout(() => {
                    if (this.dead) return;
                    if (correctUid !== this.__showingUid) return;
                    this.setState({ exists: false })
                }, 200);
            } else {
                this.setState({ hasInCssClass: false, exists: false });
            }

            if (currentModals.length <= 1) { //less than since it may have been closed before modal was activated
                document.body.classList.remove('modal-open');
                removeBackdrop();
            }
            if (currentModals[currentModals.length - 1] == this){
                currentModals.pop();
            }
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
            this.setState({ exists: true });
            setTimeout(() => {
                if (div) {
                    div.classList.add('in');
                }
                this.setState({ hasInCssClass: true });
                document.body.classList.add('modal-open');
            }, 1);
            //provide some small delay before this modal is eligible to be closed.  We don't want a double click to open / show the modal.

            setTimeout(() => {
                //highly unlikely, but just in case
                if (this.dead) return;
                if (correctUid !== this.__showingUid) return;
                currentModals.push(this);
            }, 200);
        } else {
            if (div) {
                document.body.appendChild(div);
            }
            this.setState({ exists: true, hasInCssClass: true });
            currentModals.push(this);
            document.body.classList.add('modal-open');
        }
    }
    render() {
        let children = this.props.children;
        if (!Array.isArray(children)){
            children = [children];
        }
        let modalBody = children.find(c => c.type === ModalBody),
            modalHeader = children.find(c => c.type === ModalHeader),
            modalFooter = children.find(c => c.type === ModalFooter);

        let { className, style, show, onHide, ...rest } = this.props;

        return (
            <div ref={el => this.modalRef = el} onClick={this.modalClick} className={spreadClassNames(className, 'modal ' + (this.state.hasInCssClass ? 'in' : ''))} style={{ ...style, display: this.state.exists ? 'block' : '' }} {...rest} role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        { modalHeader || null }
                        { modalBody || null }
                        { modalFooter || null }
                    </div>
                </div>
            </div>
        );
    }
    componentWillUnmount(){
        let index = currentModals.indexOf(this);
        if (index >= 0){
            currentModals.splice(index, 1);
            if (!currentModals.length){
                removeBackdrop();
            }
        }
        this.dead = true;
    }
}

Modal.Body = ModalBody;
Modal.Header = ModalHeader;
Modal.Footer = ModalFooter;

export default Modal;