import React from 'react';

const ModalBody = props => (
    <div className="modal-body">
        { props.children }
    </div>
);

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
        }
    }
    render() {
        let children = this.props.children;
        if (!Array.isArray(children)){
            children = [children];
        }
        let modalBody = children.find(c => c.type === ModalBody);

        return (
            <div className={'modal fade ' + (this.state.hasInCssClass ? 'in' : '')} style={{ display: this.state.exists ? 'block' : '' }} role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Hellooooooo</h4>
                        </div>
                        { modalBody || null }
                    </div>
                </div>
            </div>
        );
    }
}

Modal.Body = ModalBody;

export default Modal;