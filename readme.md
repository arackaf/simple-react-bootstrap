# simple-react-bootstrap-button-dropdown
Dirt simple Bootstrap dropdown button component for React

# Examples

## Basic dropdown-button

```javascript
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
    <button class=" dropdown-toggle btn btn-default">Out of the box</button>
    <div class=" dropdown-menu  ">
        <h1>Hello</h1>
    </div>
</div>
```

The most simple use case passes two children to ButtonDropdown: the first will be rendered as given, but with a `dropdown-toggle` class added; the second will be rendered as given but with a css class dropdown-menu added.  Lastly, by default, the whole container will be rendered in a div with `btn-group`.  When the `dropdown-toggle` element is clicked, the parent will have an `open` class added, which causes the dropdown content to show, per Bootstrap's css rules.  Any click anywhere causes it to hide again.

## Fully customizable

Any properties you add to the root container, including styles, will be passed through; any css classes will be merged in with `btn-group`. Any click event added to the toggle button will be invoked prior to the default behavior of toggling the button (if you want to take over this toggling yourself, see below).

## Misc options

##### Clean

Causes the `btn-group` class to not be added to the root container

##### containerElementType

Pass an element type to render instead of a div.  IE, pass `span` to render a span, etc.

##### deferDropdownRendering

Pass `true` to defer rendering of the dropdown menu until it's actually open. Use this if you're rendering a lot of dropdownButtons, which all have some sort of expensive component in the dropdown.

##### ignoreContentClick

By default any clicks in the dropdown menu will close the menu.  This is usually desired, for example, a dropdown showing links should close after one of them is clicked.  If you choose to use the dropdown for something else, and want clicks in the dropdown to *not* cause the dropdown to close, pass `true` for this option.





