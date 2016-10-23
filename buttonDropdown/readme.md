# simple-react-bootstrap-button-dropdown
Dirt simple Bootstrap dropdown button component for React

# Installing

If you're using a tool to manage your npm installs, like WebPack or jspm, then just import it with 

`import ButtonDropdown from 'simple-react-bootstrap-button-dropdown'`

If you're just using a script loader, like SystemJS, you'll first need to configure the path to `dist/buttonDropdown.js`, as in 

`"simple-react-bootstrap-button-dropdown": "node_modules/simple-react-bootstrap-button-dropdown/dist/buttonDropdown.js",`

# Examples

## Basic dropdown-button

```html
<ButtonDropdown>
    <button className="btn btn-default">Out of the box</button>
    <div>
        <h1>Hello</h1>
    </div>
</ButtonDropdown>
```

will render

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

If you need a more robust dropdown button than can be represented with a toggleButton and a dropdown div, then pass whatever arbitrary chilren you want; just be sure to manually add the `dropdown-toggle` and `dropdown-menu` classes where needed, so the component will know what's what.

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
<DropdownButton>
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
</DropdownButton>
```

Then two conditions must be satisfied:

1. The component cannot be a stateless functional component; in other words you need to define it with `class extends React.Component`. The reason boils down to refs, and `ReactDom.findDOMNode` not working with SFAs.
2. The component must pass through (or merge in) the onClick handler that's passed to it.

## Misc options

##### Clean

Causes the `btn-group` class to not be added to the root container

##### containerElementType

Pass an element type to render for the root container, instead of a div.  For example, pass the string `span` to render a span, etc.

##### deferDropdownRendering

Pass `true` to defer rendering of the dropdown menu until it's actually open. Use this if you're rendering a lot of dropdownButtons, which all have some sort of expensive component in the dropdown.

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