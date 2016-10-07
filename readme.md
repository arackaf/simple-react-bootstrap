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

The most simple use case passes two children to ButtonDropdown: the first has a `dropdown-toggle` class added, the second has a `dropdown-menu` class added.  These are rendered in a div with the css class `btn-group`.  When the `dropdown-toggle` element is clicked, the parent has an `open` class added, which causes the dropdown content to show, per Bootstrap's css rules.  Any click anywhere causes it to hide again.