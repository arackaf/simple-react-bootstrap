import Modal from '../src/Modal';
import { render } from 'react-dom';
import React from 'react';

class ModalRunner extends React.Component{
    constructor(){
        super();
        this.state = { openAnimate: false, openNoAnimate: false }
    }
    render(){
        return (
            <div>
                <br />
                <button onClick={() => this.setState({ openAnimate: true })}>Open Modal with animation</button>
                <br /><br />
                <button onClick={() => this.setState({ openNoAnimate: true })}>Open Modal - no animation</button>

                <Modal className="fade" show={ this.state.openAnimate } onHide={() => this.setState({ openAnimate: false })}>
                    <Modal.Header>
                        <h3>Hello World</h3>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Single line</p>
                        <p>Single line</p>
                        <p>Single line</p>
                        <p>Single line</p>
                        <p>Single line</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="button" className="btn btn-default" onClick={() => this.setState({ openAnimate: false })}>Close</button>
                        <button type="button" className="btn btn-primary">Save changes</button>
                    </Modal.Footer>
                </Modal>

                <Modal show={ this.state.openNoAnimate } onHide={() => this.setState({ openNoAnimate: false })}>
                    <Modal.Header>
                        <h3>Hello World</h3>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Single line</p>
                        <p>Single line</p>
                        <p>Single line</p>
                        <p>Single line</p>
                        <p>Single line</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="button" className="btn btn-default" onClick={() => this.setState({ openNoAnimate: false })}>Close</button>
                        <button type="button" className="btn btn-primary">Save changes</button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}


render(<ModalRunner />, document.getElementById('home'));


export default null;