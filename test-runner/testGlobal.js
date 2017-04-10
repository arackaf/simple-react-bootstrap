const { Modal, NavBar, ButtonDropdown } = SimpleReactBootstrap;

class TestAll extends React.Component {
    state = {};
    render(){
        return (
            <div>
                <NavBar>
                    <NavBar.Header>
                        <NavBar.Brand>
                            <a style={{ cursor: 'pointer' }}>Header</a>
                        </NavBar.Brand>
                        <NavBar.Toggle />
                    </NavBar.Header>
                    <NavBar.Nav>
                        <NavBar.Item className="class-on-item">Link 1</NavBar.Item>
                        <NavBar.Item disabled={true}>Link 2</NavBar.Item>
                        <NavBar.Item href="http://www.google.com">Link 3</NavBar.Item>
                        <NavBar.Dropdown toggleClassName="pointer-cursor" style={{ color: 'red' }} text="Sub menu">
                            <NavBar.Item>Sub option a</NavBar.Item>
                            <NavBar.Item href="#foo">Sub option b</NavBar.Item>
                            <NavBar.Item>Sub option c</NavBar.Item>
                        </NavBar.Dropdown>
                        <NavBar.Dropdown disabled={true} text="Sub menu">
                            <NavBar.Item>Sub option a</NavBar.Item>
                            <NavBar.Item>Sub option b</NavBar.Item>
                            <NavBar.Item>Sub option c</NavBar.Item>
                        </NavBar.Dropdown>
                    </NavBar.Nav>
                    <NavBar.Form className="pull-left">
                        <div className="form-group">
                            <div className="input-group">
                        <span className="input-group-btn">
                            <button className="btn default">Search</button>
                        </span>
                                <input className="form-control" placeholder="Quick title search" />
                            </div>
                        </div>
                    </NavBar.Form>
                </NavBar>
                <br/>
                <br/>
                <ButtonDropdown>
                    <button className="btn btn-default">Basic button dropdown</button>
                    <div>
                        <h1>Hello</h1>
                    </div>
                </ButtonDropdown>
                <br/>
                <br/>
                <button className="btn btn-primary" onClick={() => this.setState({ basicModal: true })}>Open Modal</button>
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
            </div>
        );
    }
}

ReactDOM.render(<TestAll />, document.getElementById('home'));

export default null;