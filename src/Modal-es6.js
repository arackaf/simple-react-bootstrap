import React from 'react';

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

    backdrop.classList.remove('in');
    setTimeout(() => backdrop.parentNode.removeChild(backdrop), 200);
}

class Modal extends React.Component {
    constructor(){
        super();
        this.state = { exists: false, hasInCssClass: false };
    }
    componentDidUpdate(prevProps){
        if (!prevProps.show && this.props.show){
            let div = document.createElement('div');
            div.classList.add('modal-backdrop', 'simple-react-modal-backdrop', 'fade');
            document.body.appendChild(div);
            this.setState({ exists: true });
            setTimeout(() => {
                div.classList.add('in');
                this.setState({ hasInCssClass: true });
            }, 1);
            setTimeout(() => currentModal = this, 100);
        } else if (prevProps.show && !this.props.show){
            this.setState({ hasInCssClass: false });
            setTimeout(() => this.setState({ exists: false }), 200);
            removeBackdrop();
            if (currentModal == this){
                currentModal = null;
                console.log('null\'d');
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

        return (
            <div ref={el => this.modalRef = el} className={'modal fade ' + (this.state.hasInCssClass ? 'in' : '')} style={{ display: this.state.exists ? 'block' : '' }} role="dialog">
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