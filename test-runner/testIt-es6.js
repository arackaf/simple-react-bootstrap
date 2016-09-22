import Modal from '../src/Modal';
import { render } from 'react-dom';
import React from 'react';

class ModalRunner extends React.Component{
    constructor(){
        super();
        this.state = { openAnimate: false, openNoAnimate: false, initialStart: true }
    }
    render(){
        return (
            <div>
                <br />
                <button onClick={() => this.setState({ openAnimate: true })}>Open Modal with animation</button>
                <br /><br />
                <button onClick={() => this.setState({ openNoAnimate: true })}>Open Modal - no animation</button>
                <br /><br />
                <button onClick={() => this.setState({ initialStart: true })}>Open initial start modal </button>

                <Modal className="fade" show={ this.state.openAnimate } onHide={() => this.setState({ openAnimate: false })}>
                    <Modal.Header className="red" style={{ padding: '50px' }}>
                        <h3>Hello World</h3>
                    </Modal.Header>
                    <Modal.Body className="green" style={{ padding: '100px' }}>
                        <p>Single line</p>
                        <p>Single line</p>
                        <p>Single line</p>
                        <p>Single line</p>
                        <p>Single line</p>

                        <button onClick={() => this.setState({ modal2Animate: true })}>Modal 2 animate</button>
                        <button onClick={() => this.setState({ modal2NoAnimate: true })}>Modal 2 no animate</button>

                    </Modal.Body>
                    <Modal.Footer className="blue" style={{ padding: '100px' }}>
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

                        <button onClick={() => this.setState({ modal2Animate: true })}>Modal 2 animate</button>
                        <button onClick={() => this.setState({ modal2NoAnimate: true })}>Modal 2 no animate</button>

                    </Modal.Body>
                    <Modal.Footer>
                        <button type="button" className="btn btn-default" onClick={() => this.setState({ openNoAnimate: false })}>Close</button>
                        <button type="button" className="btn btn-primary">Save changes</button>
                    </Modal.Footer>
                </Modal>



                <Modal className="fade" show={ this.state.modal2Animate } onHide={() => this.setState({ modal2Animate: false })}>
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
                        <button type="button" className="btn btn-default" onClick={() => this.setState({ modal2Animate: false })}>Close</button>
                        <button type="button" className="btn btn-primary">Save changes</button>
                    </Modal.Footer>
                </Modal>

                <Modal show={ this.state.modal2NoAnimate } onHide={() => this.setState({ modal2NoAnimate: false })}>
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
                        <button type="button" className="btn btn-default" onClick={() => this.setState({ modal2NoAnimate: false })}>Close</button>
                        <button type="button" className="btn btn-primary">Save changes</button>
                    </Modal.Footer>
                </Modal>

                <Modal className="fade" show={ this.state.initialStart } onHide={() => this.setState({ initialStart: false })}>
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
                        <button type="button" className="btn btn-default" onClick={() => this.setState({ initialStart: false })}>Close</button>
                        <button type="button" className="btn btn-primary">Save changes</button>
                    </Modal.Footer>
                </Modal>


            </div>
        )
    }
}


render(<ModalRunner />, document.getElementById('home'));


export default null;