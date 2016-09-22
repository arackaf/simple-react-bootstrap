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

let currentModals = [];
document.addEventListener('click', function(evt){
    if (!currentModals.length) return;
    let modalToCloseMaybe = currentModals[currentModals.length - 1];

    var element = evt.target,
        modalRoot = modalToCloseMaybe.modalRef,
        modalContent = modalRoot.getElementsByClassName('modal-content')[0];

    if (modalContent.contains(element)) return;

    currentModals[currentModals.length - 1].props.onHide();
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
    componentDidMount(){
        if (this.props.show){
            this._showModal();
        }
    }
    componentDidUpdate(prevProps){
        if (!prevProps.show && this.props.show){
            this._showModal();
        } else if (prevProps.show && !this.props.show){
            let isAnimating = /\bfade\b/.test(this.modalRef.className);

            if (isAnimating){
                this.setState({ hasInCssClass: false });
                setTimeout(() => this.setState({ exists: false }), 200);
            } else {
                this.setState({ hasInCssClass: false, exists: false });
            }

            if (currentModals.length === 1) {
                removeBackdrop();
            }
            if (currentModals[currentModals.length - 1] == this){
                currentModals.pop();
            }
        }
    }
    _showModal(){
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
            }, 1);
            setTimeout(() => currentModals.push(this), 100);
        } else {
            if (div) {
                document.body.appendChild(div);
            }
            this.setState({ exists: true, hasInCssClass: true });
            currentModals.push(this);
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