Dirt simple React bindings for a Bootstrap Modal

# Installing

If you're using a tool to manage your npm installs, like WebPack or jspm, then just import it with 

`import Modal from 'simple-react-bootstrap-modal'`

If you're just using a script loader, like SystemJS, you'll first need to configure the path to `src/modal.js`, as in 

`"simple-react-bootstrap-modal": "node_modules/simple-react-bootstrap-modal/src/modal.js",`

# Background

This is not a drop-in replacement for react-bootstrap's modal.  The APIs are very similar, but react-bootstrap is far more robust (and large).

This component actually renders the modal in place, and adds the relevant css classes, and backdrops as needed to simulate normal Bootstrap behavior.  The result is a much smaller utility, but at the expense of some edge cases not working properly.  Namely, if you unmount a modal that's currently visible, it'll just vanish, without the normal animation happening.

# Usage

```html
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
```

The css class `fade` adds animation behavior, just like with regular Bootstrap.

Everything else should work as expected.  All props passed down to any of these sections should pass through properly.