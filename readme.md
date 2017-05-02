These React components implement the Bootstrap components which require more than just css classes, namely `Modal`, `ButtonDropdown`, and `NavBar`.  

Note: these components used to be separate npm installs, namely `simple-react-bootstrap-modal`, `simple-react-bootstrap-navbar`, and `simple-react-bootstrap-button-dropdown`.  The code is the same, they're just all under one project now, as they probably should have always been.

# Installing

If you're using a tool to manage your npm installs, like WebPack or jspm, then just import it with 

```javasctipt
import {
    Modal, 
    NavBar, 
    ButtonDropdown, 
    Tabs, 
    Tab
} from 'simple-react-bootstrap'
```

If you're just using a script loader, like SystemJS, you'll first need to configure the path to `dist/simple-react-bootstrap.js`, as in 

`"simple-react-bootstrap": "node_modules/simple-react-bootstrap/dist/simple-react-bootstrap.js"`

Lastly, if you want to test these components from just a script tag, like in a jsbin, or similar, then you can use the `simple-react-bootstrap-script-tag.js` file, also in the dist folder.  You can see code using it [here](https://github.com/arackaf/simple-react-bootstrap/blob/master/runGlobal.htm) with the real work being done [here](https://github.com/arackaf/simple-react-bootstrap/blob/master/test-runner-es6/testGlobal.js)

# Documentation

# Tabs

## Usage

```javascript
<Tabs>
    <Tab caption='A'>
        This is content a
    </Tab>
    <Tab caption='B'>
        This is content b
    </Tab>
    <Tab caption='C'>
        This is content c
    </Tab>
</Tabs>
```

Which renders uncontrolled tabs with the first tab selected by default.  To select a different tab by default, pass `defaultTab` to tabs, with 
the zero-based index (either string or number will work fine) of the relevant tab.

```javascript
<Tabs defaultTab='1'>
    <Tab caption='A'>
        This is content a
    </Tab>
    <Tab caption='B'>
        Selected by default
    </Tab>
    <Tab caption='C'>
        This is content c
    </Tab>
</Tabs> 
```

or you can give your tabs custom names

```javascript
<Tabs defaultTab='b'>
    <Tab name='a' caption='A'>
        This is content a
    </Tab>
    <Tab name='b' caption='B'>
        This is content b
    </Tab>
    <Tab name='c' caption='C'>
        This is content c
    </Tab>
</Tabs>
```

## Controlled

Exactly the same as above, except pass in a `tab` property representing the current tab, and an `onChangeTab` method which will be invoked when
a tab is selected, and passed the clicked tab's name.  By default that will be the zero-based index, unless you override it with your own name, as shown above.

```jsx
<Tabs tab={this.state.controlledB} onChangeTab={this.setB}>
    <Tab caption='A'>
        This is content a
    </Tab>
    <Tab caption='B'>
        This is content b
    </Tab>
    <Tab caption='C'>
        This is content c
    </Tab>
</Tabs>
```

## Additional options

Any other props you pass to `<Tab />` will be passed along to the corresponding tab header's `<li>`.

```jsx
<Tabs>
    <Tab caption='A' className='red' style={{backgroundColor: 'red'}}>
        This is content a
    </Tab>
    <Tab caption='B' className='blue' style={{backgroundColor: 'blue'}}>
        This is content b
    </Tab>
    <Tab caption='C'>
        This is content c
    </Tab>
</Tabs>
```

If you'd like to pass props down to the corresponding tab-pane div, you can pass them all in a single `paneProps` prop

```jsx
<Tabs>
    <Tab caption='A' paneProps={{className: 'red', style: {backgroundColor: 'red'} }}>
        This is content a
    </Tab>
    <Tab caption='B' paneProps={{className: 'blue', style: {backgroundColor: 'blue'} }}>
        This is content b
    </Tab>
    <Tab caption='C'>
        This is content c
    </Tab>
</Tabs>
```

Coming soon: tabs with dropdown headers, as shown here: http://getbootstrap.com/javascript/#tabs 

# Modal

## Usage

```jsx
<Modal className="fade" show={this.state.basicModal} onHide={() => this.setState({ basicModal: false })}>
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

The css class `fade` adds animation, as with Bootstrap normally.

Everything else should work as expected.  All props passed down to any of these sections should pass through properly.

---

# NavBar

The NavBar component is mostly a set of helpers for generating the html Bootstrap expects.  The real value this component adds is in the `NavBar.Dropdown`, and the `NavBar.Toggle` components; the latter adds the normal Bootstrap behavior which hides the NavBar's contents on small screens, and renders instead a "hamburger menu" button to slides toggle the contents down / up.

## Usage

```jsx
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
        <NavBar.Item active={true} href="http://www.google.com">Link 3</NavBar.Item>
        <NavBar.Dropdown toggleClassName="pointer-cursor" style={{ color: 'red' }} text="Sub menu">
            <NavBar.Item>Sub option a</NavBar.Item>
            <NavBar.Item href="#foo">Sub option b</NavBar.Item>
            <NavBar.ItemDivider />
            <NavBar.Item>Sub option c</NavBar.Item>
        </NavBar.Dropdown>
        <NavBar.Dropdown disabled={true} text="Sub menu">
            <NavBar.Item>Sub option a</NavBar.Item>
            <NavBar.Item>Sub option b</NavBar.Item>
            <NavBar.Item>Sub option c</NavBar.Item>
        </NavBar.Dropdown>
    </NavBar.Nav>
    <NavBar.Header>
        <NavBar.Brand>
            <a style={{ cursor: 'pointer' }}>Second Header</a>
        </NavBar.Brand>
        <NavBar.Toggle />
    </NavBar.Header>
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
```

The `NavBar.Dropdown` component is implemented internally with the ButtonDropdown component (documented below).  `ignoreContentClick` will be passed through as needed; also, manually controlling the dropdown's "open" state is just a matter of rendering the ButtonDropdown yourself, in controlled mode.  For example

```jsx
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
            <NavBar.Item active={true} href="http://www.google.com">Link 3</NavBar.Item>

            <ButtonDropdown containerElementType="li" open={this.state.manualOpen} clean={true} >
                <a className='dropdown-toggle pointer-cursor' style={{ color: 'red' }}>Sub menu <span className="caret"></span></a>
                <ul className='dropdown-menu'>
                    <NavBar.Item>Sub option a</NavBar.Item>
                    <NavBar.Item href="#foo">Sub option b</NavBar.Item>
                    <NavBar.ItemDivider />
                    <NavBar.Item>Sub option c</NavBar.Item>
                </ul>
            </ButtonDropdown>

            <NavBar.Dropdown disabled={true} text="Sub menu">
                <NavBar.Item>Sub option a</NavBar.Item>
                <NavBar.Item>Sub option b</NavBar.Item>
                <NavBar.Item>Sub option c</NavBar.Item>
            </NavBar.Dropdown>
        </NavBar.Nav>
        <NavBar.Header>
            <NavBar.Brand>
                <a style={{ cursor: 'pointer' }}>Second Header</a>
            </NavBar.Brand>
            <NavBar.Toggle />
        </NavBar.Header>
        <NavBar.Form className="pull-left">
            <div className="form-group">
                <div className="input-group">
                        <span className="input-group-btn">
                            <button className="btn default">Search</button>
                        </span>
                    <input className="form-control" placeholder="Quick title search"/>
                </div>
            </div>
        </NavBar.Form>
    </NavBar>
    <button onClick={() => this.setState({ manualOpen: true })}>Down</button>
    <button onClick={() => this.setState({ manualOpen: false })}>Up</button>
</div>
```

--- 

# ButtonDropdown

## Basic dropdown-button

```jsx
<ButtonDropdown>
    <button className="btn btn-default">Out of the box</button>
    <div>
        <h1>Hello</h1>
    </div>
</ButtonDropdown>
```

which will render

```jsx
<div class="btn-group">
    <button class="dropdown-toggle btn btn-default">Out of the box</button>
    <div class="dropdown-menu">
        <h1>Hello</h1>
    </div>
</div>
```

The most simple use case passes two children to ButtonDropdown: the first will be rendered as given, but with a `dropdown-toggle` class added; the second will be rendered as given, but with a  `dropdown-menu` class added.  By default, both will be rendered in a div with the `btn-group` class added.  When the `dropdown-toggle` element is clicked, the parent will have an `open` class added, which causes the dropdown content to show, per Bootstrap's css rules.  Any click anywhere causes it to hide again.

## Fully customizable

Any properties you add to the root container, including styles, will be passed through; any css classes will be merged in with `btn-group`. Any click event added to the toggle button will be invoked prior to the default behavior of toggling the button (if you want to take over this toggling yourself, see below).

## Fully *fully* customizable

If you need a more robust dropdown button than can be represented with a toggleButton and a dropdown div, then pass whatever arbitrary children you want; just be sure to manually add the `dropdown-toggle` and `dropdown-menu` classes where needed, so the component will know what's what.

```jsx
<ButtonDropdown>
    <i className="fa fa-tag"></i>
    <span>Arbitrary children + with null</span>
    <span>Hello</span>
    {null}
    <a className="dropdown-toggle"><i className="fa fa-fw fa-caret-down"></i></a>
    <span><---- toggle is right there</span>
    <div className="dropdown-menu">
        <div>
            <span>
                <h1>Hello</h1>
            </span>
        </div>
        <h1>World</h1>
    </div>
</ButtonDropdown>
```

## Using a custom component for the toggle button

One caveat to the above, is that if you want to use a custom component for the toggle, such as

```jsx
<ButtonDropdown>
    <HashBtn className={`btn btn-default`}
             toMerge={{isSupportTicket: 1}}>Tickets <span className="caret"></span>
    </HashBtn>
    <ul>
        <li className="dropdown-header">Close Requests</li>
        <li className={searchVm.closeRequests == '' ? 'active' : ''}>
            <HashA toMerge={{closeRequests: null}}>Any</HashA>
        </li>
        <li className={searchVm.closeRequests == '0' ? 'active' : ''}>
            <HashA toMerge={{closeRequests: 0}}>None</HashA>
        </li>
        <li className={searchVm.closeRequests == '1' ? 'active' : ''}>
            <HashA toMerge={{closeRequests: 1}}>One</HashA>
        </li>
        <li className={searchVm.closeRequests == '2' ? 'active' : ''}>
            <HashA toMerge={{closeRequests: 2}}>Two</HashA>
        </li>
        <li className={searchVm.closeRequests == '3' ? 'active' : ''}>
            <HashA toMerge={{closeRequests: 'Over2'}}>More Than 2</HashA>
        </li>
    </ul>
</ButtonDropdown>
```

Then two conditions must be satisfied:

1. The component cannot be a stateless functional component; in other words you need to define it with `class extends React.Component`. The reason boils down to refs, and `ReactDom.findDOMNode` not working with SFCs.
2. The component must pass through (or merge in) the onClick handler that's passed to it.

## Using a custom component for the dropdown content

To use a custom component for the dropdown content, two conditions must be satisfied

1. The component cannot be a stateless functional component; in other words you need to define it with `class extends React.Component`. The reason boils down to refs, and `ReactDom.findDOMNode` not working with SFCs.
2. The component must pass through (or merge in) the classNames property, so the right css class makes it in.

## Misc options

##### clean

Causes the `btn-group` class to not be added to the root container

##### disabled

Disables the button, and prevents any toggling from happening

##### containerElementType

Pass an element type to render for the root container, instead of a div.  For example, pass the string `span` to render a span, etc.

##### deferDropdownRendering

Pass `true` to defer rendering of the dropdown menu until it's actually open. Use this if you're rendering a lot of ButtonDropdowns, which all have some sort of expensive component in the dropdown.

##### ignoreContentClick

By default any clicks in the dropdown menu will close the menu.  This is usually desired, for example, a dropdown showing links should close after one of them is clicked.  If you choose to use the dropdown for something else, and want clicks in the dropdown to *not* cause the dropdown to close, pass `true` for this option.

## Controlled mode

If you'd like to manually control the dropdown state, you can pass a value for `open` to the root container.  You can then provide an `onToggle` callback that'll be called in all the places where the open/closed toggling would normally be done, when in un-controlled mode (ie, no `open` passed in).

All the normal options are still respected.  For example, this would essentially re-create the default dropdown behavior, while ignoring any clicks in the dropdown menu.

```jsx
<ButtonDropdown 
    ignoreContentClick={true} 
    onToggle={() => this.setState({ controlled1Open: !this.state.controlled1Open })} 
    open={this.state.controlled1Open}>
    <button className="btn btn-default">Ignore content click still respected</button>
    <div>
        <button className="btn btn-primary">Nothing</button>
        <button onClick={() => this.setState({ controlled1Open: false })} 
                className="btn btn-danger">Close</button>
    </div>
</ButtonDropdown>
```

A more flexible (if contrived) example follows.  This causes the dropdown to only open if the toggle button is clicked, and once open, will only close if the close button in the dropdown menu is clicked.

```jsx
<ButtonDropdown open={this.state.controlled3Open}>
    <button onClick={() => this.setState({ controlled3Open: true })} 
            className="btn btn-default">Toggle button to open, red button to close. ONLY
    </button>
    <div>
        <button className="btn btn-primary">Nothing</button>
        <button onClick={() => this.setState({ controlled3Open: false })} 
                className="btn btn-danger">Close
        </button>
    </div>
</ButtonDropdown>
```