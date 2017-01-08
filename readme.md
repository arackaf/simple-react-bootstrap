These React components implement the Bootstrap components which require more than just css classes, namely `Modal`, `ButtonDropdown`, and `NavBar`.  

Note: these components used to be separate npm installs, namely `simple-react-bootstrap-modal`, `simple-react-bootstrap-navbar`, and `simple-react-bootstrap-button-dropdown`.  The code is the same, they're just all under one project now, as they probably should have always been.

# Installing

If you're using a tool to manage your npm installs, like WebPack or jspm, then just import it with 

`import {Modal, NavBar, ButtonDropdown} from 'simple-react-bootstrap'`

If you're just using a script loader, like SystemJS, you'll first need to configure the path to `dist/simple-react-bootstrap.js`, as in 

`"simple-react-bootstrap": "node_modules/simple-react-bootstrap/dist/simple-react-bootstrap.js"`

Note that the dist folder this project installs with also has stand-alone builds of just the modal, navBar, and buttonDropdown, if you don't need them all; just be aware that NavBar is bundled with buttonDropdown, since it uses it.

Lastly, if you want to test these components from just a script tag, like in a jsbin, or similar, then you can use the `simple-react-bootstrap-script-tag.js` file, also in the dist folder.  You can see code using it [here](https://github.com/arackaf/simple-react-bootstrap/blob/master/runGlobal.htm) with the real work being done [here](https://github.com/arackaf/simple-react-bootstrap/blob/master/test-runner/testGlobal.es6)

# Documentation

The documentation / samples for these components follow, but first a quick note on why there's no `tabs` component. It boils down to the fact that it's easier to manually implement a tabs component as needed, than to abstract it well.  The markup Bootstrap is expecting is rather straightforward, and it's reasonably easy to write helpers tailored to your app's architecture that listens for the right clicks, and adds the `active` class where needed.  For example, here's what my MobX helpers look like for rendering Bootstrap tabs.

```javascript
const TabToggle = ({ model, tabProperty }) => observer(props => {
    let { tab, className = '', children, ...rest } = props;

    return <li onClick={model[`setTab_${tab}`]} className={className + (model[tabProperty] == tab ? ' active' : '')} {...rest}>{children}</li>
});

const TabPane = ({ model, tabProperty }) => observer(props => {
    let { tab, className = '', children, ...rest } = props;

    return <div className={'tab-pane ' + className + (model[tabProperty] == tab ? ' active' : '')} {...rest}>{children}</div>
});

export const tabHelperMixin = (target, options) => {
    let property = options.property;

    extendObservable(target, { [property]: options.defaultTab || '' });

    (options.tabValues || []).forEach(val => {
        target[`setTab_${val}`] = action(() => target[property] = val);
    });

    target['TabToggle' || options.toggleComponentName] = TabToggle({ model: target, tabProperty: property });
    target['TabPane' || options.paneComponentName] = TabPane({ model: target, tabProperty: property });
};
```

Obviously that would look different if you were using Redux, or vanilla React, but the basic idea would be the same.

Now, on with the documentation

---

# Modal

## Background

This is not a drop-in replacement for react-bootstrap's modal.  The APIs are very similar, but react-bootstrap is far more robust (and large).

This component actually renders the modal in place, and adds the relevant css classes, and backdrops as needed to simulate normal Bootstrap behavior.  The result is a much smaller utility, but at the expense of some edge cases not working properly.  For example, if you unmount a modal that's currently visible, it'll just vanish, without the normal animation happening.  Also, to get the slide in animation working, I first show the modal, then in a `setTimeout(code, 1)` add the `in` class to start the animation.  This is needed because of how the Bootstrap css transition works, but it means an extremely rapid (within a very narrow range of values) toggling between the modal's open and closed state, likely via code since it's all but impossible to achieve this via user interaction, may occasionally cause an animation to fail, with the modal appearing suddenly.

## Usage

```html
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

```javascript
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

```javascript
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

```html
<ButtonDropdown>
    <button className="btn btn-default">Out of the box</button>
    <div>
        <h1>Hello</h1>
    </div>
</ButtonDropdown>
```

which will render

```html
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

```html
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

```html
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

```html
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

```html
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