import React from 'react';

const spreadClassNames = (userClassName, baseCssClasses) => `${baseCssClasses || ''} ${userClassName || ''}`;

const ModalHeader = props => (
    <div className="modal-header">
        { props.children }
    </div>
);

const ModalFooter = props => (
    <div className="modal-footer">
        { props.children }
    </div>
);

const ModalBody = props => (
    <div className="modal-body">
        { props.children }
    </div>
);

let currentModal = null;
document.addEventListener('click', function(evt){
    if (!currentModal) return;

    var element = evt.target,
        modalRoot = currentModal.modalRef,
        modalContent = modalRoot.getElementsByClassName('modal-content')[0];

    if (modalContent.contains(element)) return;

    currentModal.props.onHide();
    currentModal = null;
});

function removeBackdrop(){
    let backdrop = document.getElementsByClassName('simple-react-modal-backdrop')[0];
    if (!backdrop)return;

    let isAnimating = /\bfade\b/.test(backdrop.className);

    if (!isAnimating){
        backdrop.parentNode.removeChild(backdrop)
    } else {
        backdrop.classList.remove('in');
        setTimeout(() => backdrop.parentNode.removeChild(backdrop), 200);
    }
}

class Modal extends React.Component {
    constructor(){
        super();
        this.state = { exists: false, hasInCssClass: false };
    }
    componentDidUpdate(prevProps){
        if (!prevProps.show && this.props.show){
            let div = document.createElement('div'),
                isAnimating = /\bfade\b/.test(this.modalRef.className);

            div.classList.add(...['modal-backdrop', 'simple-react-modal-backdrop', (isAnimating ? 'fade' : 'in')]);

            if (isAnimating){
                document.body.appendChild(div);
                this.setState({ exists: true });
                setTimeout(() => {
                    div.classList.add('in');
                    this.setState({ hasInCssClass: true });
                }, 1);
                setTimeout(() => currentModal = this, 100);
            } else {
                document.body.appendChild(div);
                this.setState({ exists: true, hasInCssClass: true });
                currentModal = this;
            }
        } else if (prevProps.show && !this.props.show){
            let isAnimating = /\bfade\b/.test(this.modalRef.className)

            if (isAnimating){
                this.setState({ hasInCssClass: false });
                setTimeout(() => this.setState({ exists: false }), 200);
            } else {
                this.setState({ hasInCssClass: false, exists: false });
            }

            removeBackdrop();
            if (currentModal == this){
                currentModal = null;
            }
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

        let { className, style, ...rest } = this.props;

        return (
            <div ref={el => this.modalRef = el} className={spreadClassNames(className, 'modal ' + (this.state.hasInCssClass ? 'in' : ''))} style={{ ...style, display: this.state.exists ? 'block' : '' }} {...rest} role="dialog">
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
}

Modal.Body = ModalBody;
Modal.Header = ModalHeader;
Modal.Footer = ModalFooter;

export default Modal;