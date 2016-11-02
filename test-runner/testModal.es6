import { render } from 'react-dom';
import React from 'react';

import Modal from '../src/Modal';

class ModalRunner extends React.Component{
    state = { openAnimate: false, openNoAnimate: false, initialStart: false, openUnmountable1: false, isUnmounted1: false, basicModal: false, toggleOpen: false };
    toggleTest = () =>{
        let number = +this.toggles.value;
        let delay = +this.delay.value;
        let i = 0;

        const toggle = () => {
            //console.log({ toggleOpen: !this.state.toggleOpen }, i, number, delay);
            this.setState({ toggleOpen: !this.state.toggleOpen });
            if (++i < number){
                setTimeout(toggle, delay);
            }
        };

        toggle();
    };
    render(){
        return (
            <div className="xxx">
                <br /><br /><br />

                <button onClick={() => this.setState({ basicModal: true })}>Open Basic Modal 1</button>
                <br /><br />
                <button onClick={() => this.setState({ openUnmountable1: true })}>Un-mountable Modal 1</button>
                <br /><br />
                <button onClick={() => this.setState({ openAnimate: true })}>Open Modal with animation</button>
                <br /><br />
                <button onClick={() => this.setState({ openNoAnimate: true })}>Open Modal - no animation</button>
                <br /><br />
                <button onClick={() => this.setState({ initialStart: true })}>Open initial start modal </button>
                <br /><br />
                <input defaultValue={2} placeholder="toggles" ref={el => this.toggles = el} />&nbsp;<input defaultValue={50} placeholder="delay" ref={el => this.delay = el} />
                <br />
                <button onClick={this.toggleTest}>Run toggle</button>

                <Modal className="fade" show={ this.state.basicModal } onHide={() => this.setState({ basicModal: false })}>
                    <Modal.Header>
                        <h3>Hello World</h3>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Modal body</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="button" className="btn btn-default" onClick={() => this.setState({ basicModal: false })}>Close</button>
                        <button type="button" className="btn btn-primary">Save changes</button>
                    </Modal.Footer>
                </Modal>

                <Modal className="fade" show={ this.state.toggleOpen } onHide={() => this.setState({ toggleOpen: false })}>
                    <Modal.Header>
                        <h3>Hello World</h3>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Modal body</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="button" className="btn btn-default" onClick={() => this.setState({ toggleOpen: false })}>Close</button>
                        <button type="button" className="btn btn-primary">Save changes</button>
                    </Modal.Footer>
                </Modal>


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

                {!this.state.isUnmounted1 ?
                    <Modal className="fade" show={ this.state.openUnmountable1 } onHide={() => this.setState({ openUnmountable1: false })}>
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
                            <button type="button" className="btn btn-default" onClick={() => this.setState({ openUnmountable1: false })}>Close</button>
                            <button type="button" className="btn btn-danger" onClick={() => this.setState({ isUnmounted1: true })}>KILL</button>
                            <button type="button"
                                    className="btn btn-danger"
                                    onClick={() => {
                                        this.setState({ openUnmountable1: false });
                                        setTimeout(() => this.setState({ isUnmounted1: true }), 10);
                                    }
                                }>KILL AND BREAK</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </Modal.Footer>
                    </Modal> : null}


            </div>
        )
    }
}


render(<ModalRunner />, document.getElementById('home'));


export default null;