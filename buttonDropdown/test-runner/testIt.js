'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactDom = require('react-dom');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ButtonDropdown = require('../src/ButtonDropdown');

var _ButtonDropdown2 = _interopRequireDefault(_ButtonDropdown);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DummyButton = function (_Component) {
    _inherits(DummyButton, _Component);

    function DummyButton() {
        _classCallCheck(this, DummyButton);

        return _possibleConstructorReturn(this, (DummyButton.__proto__ || Object.getPrototypeOf(DummyButton)).apply(this, arguments));
    }

    _createClass(DummyButton, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'button',
                { className: "btn btn-primary" + (' ' + this.props.className), onClick: this.props.onClick },
                'Custom Element'
            );
        }
    }]);

    return DummyButton;
}(_react.Component);

var TestCases = function (_Component2) {
    _inherits(TestCases, _Component2);

    function TestCases() {
        var _ref;

        var _temp, _this2, _ret;

        _classCallCheck(this, TestCases);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, (_ref = TestCases.__proto__ || Object.getPrototypeOf(TestCases)).call.apply(_ref, [this].concat(args))), _this2), _this2.state = { controlled1Open: false, controlled2Open: false, controlled3Open: false, controlled4Open: false }, _temp), _possibleConstructorReturn(_this2, _ret);
    }

    _createClass(TestCases, [{
        key: 'render',
        value: function render() {
            var _this3 = this;

            return _react2.default.createElement(
                'div',
                { style: { paddingLeft: 30 } },
                _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                        'div',
                        { className: 'col-xs-6' },
                        _react2.default.createElement(
                            'span',
                            null,
                            'UNCONTROLLED'
                        ),
                        _react2.default.createElement('br', null),
                        _react2.default.createElement(
                            _ButtonDropdown2.default,
                            null,
                            _react2.default.createElement(
                                'button',
                                { className: 'btn btn-default' },
                                'Out of the box'
                            ),
                            _react2.default.createElement(
                                'div',
                                null,
                                _react2.default.createElement(
                                    'h1',
                                    null,
                                    'Hello'
                                )
                            )
                        ),
                        _react2.default.createElement('br', null),
                        _react2.default.createElement('br', null),
                        _react2.default.createElement(
                            _ButtonDropdown2.default,
                            null,
                            _react2.default.createElement(DummyButton, null),
                            _react2.default.createElement(
                                'div',
                                null,
                                _react2.default.createElement(
                                    'h1',
                                    null,
                                    'Hello'
                                )
                            )
                        ),
                        _react2.default.createElement('br', null),
                        _react2.default.createElement('br', null),
                        _react2.default.createElement(
                            'div',
                            { className: 'btn-group' },
                            ' ',
                            _react2.default.createElement(
                                _ButtonDropdown2.default,
                                { clean: true },
                                _react2.default.createElement(
                                    'button',
                                    { className: 'btn btn-default' },
                                    'Out of the box + clean'
                                ),
                                _react2.default.createElement(
                                    'div',
                                    null,
                                    _react2.default.createElement(
                                        'h1',
                                        null,
                                        'Hello'
                                    )
                                )
                            )
                        ),
                        _react2.default.createElement('br', null),
                        _react2.default.createElement('br', null),
                        _react2.default.createElement(
                            _ButtonDropdown2.default,
                            { 'data-foo': '1', className: 'blue', style: { width: '400px', backgroundColor: 'red' } },
                            _react2.default.createElement(
                                'button',
                                { 'data-blah': '2', className: 'btn btn-default' },
                                'Out of the box styling + blue css + data-'
                            ),
                            _react2.default.createElement(
                                'div',
                                { 'data-lala': '3' },
                                _react2.default.createElement(
                                    'h1',
                                    null,
                                    'Hello'
                                )
                            )
                        ),
                        _react2.default.createElement('br', null),
                        _react2.default.createElement('br', null),
                        _react2.default.createElement(
                            _ButtonDropdown2.default,
                            null,
                            _react2.default.createElement(
                                'button',
                                { onClick: function onClick() {
                                        return console.log('HELLO WORLD on toggle item');
                                    }, className: 'btn btn-default' },
                                'click handler on toggle button respected'
                            ),
                            _react2.default.createElement(
                                'div',
                                null,
                                _react2.default.createElement(
                                    'h1',
                                    null,
                                    'Hello'
                                )
                            )
                        ),
                        _react2.default.createElement('br', null),
                        _react2.default.createElement('br', null),
                        _react2.default.createElement(
                            _ButtonDropdown2.default,
                            { containerElementType: 'span' },
                            _react2.default.createElement(
                                'button',
                                { className: 'btn btn-default' },
                                'Use a span'
                            ),
                            _react2.default.createElement(
                                'div',
                                null,
                                _react2.default.createElement(
                                    'h1',
                                    null,
                                    'Hello'
                                )
                            )
                        ),
                        _react2.default.createElement('br', null),
                        _react2.default.createElement('br', null),
                        _react2.default.createElement(
                            _ButtonDropdown2.default,
                            null,
                            _react2.default.createElement(
                                'button',
                                { className: 'btn btn-default red' },
                                _react2.default.createElement(
                                    'h4',
                                    null,
                                    'Some styling + css class'
                                ),
                                _react2.default.createElement('i', { className: 'fa fa-fw fa-tag' })
                            ),
                            _react2.default.createElement(
                                'div',
                                null,
                                _react2.default.createElement(
                                    'div',
                                    null,
                                    _react2.default.createElement(
                                        'span',
                                        null,
                                        _react2.default.createElement(
                                            'h1',
                                            null,
                                            'Hello'
                                        )
                                    )
                                ),
                                _react2.default.createElement(
                                    'h1',
                                    null,
                                    'World'
                                )
                            )
                        ),
                        _react2.default.createElement('br', null),
                        _react2.default.createElement('br', null),
                        _react2.default.createElement(
                            _ButtonDropdown2.default,
                            { ignoreContentClick: true },
                            _react2.default.createElement(
                                'button',
                                { className: 'btn btn-default' },
                                'Menu doesn\'t cause dropdown to close'
                            ),
                            _react2.default.createElement(
                                'div',
                                null,
                                _react2.default.createElement(
                                    'div',
                                    null,
                                    _react2.default.createElement(
                                        'span',
                                        null,
                                        _react2.default.createElement(
                                            'h1',
                                            null,
                                            'Hello'
                                        )
                                    )
                                ),
                                _react2.default.createElement(
                                    'h1',
                                    null,
                                    'World'
                                )
                            )
                        ),
                        _react2.default.createElement('br', null),
                        _react2.default.createElement('br', null),
                        _react2.default.createElement(
                            _ButtonDropdown2.default,
                            { deferDropdownRendering: true, ignoreContentClick: true },
                            _react2.default.createElement(
                                'button',
                                { className: 'btn btn-default' },
                                'Dropdown on demand'
                            ),
                            _react2.default.createElement(
                                'div',
                                null,
                                _react2.default.createElement(
                                    'div',
                                    null,
                                    _react2.default.createElement(
                                        'span',
                                        null,
                                        _react2.default.createElement(
                                            'h1',
                                            null,
                                            'Hello'
                                        )
                                    )
                                ),
                                _react2.default.createElement(
                                    'h1',
                                    null,
                                    'World'
                                )
                            )
                        ),
                        _react2.default.createElement('br', null),
                        _react2.default.createElement('br', null),
                        _react2.default.createElement(
                            _ButtonDropdown2.default,
                            null,
                            _react2.default.createElement('i', { className: 'fa fa-tag' }),
                            _react2.default.createElement(
                                'span',
                                null,
                                'Arbitrary children'
                            ),
                            _react2.default.createElement(
                                'span',
                                null,
                                'Hello'
                            ),
                            _react2.default.createElement(
                                'a',
                                { className: 'dropdown-toggle' },
                                _react2.default.createElement('i', { className: 'fa fa-fw fa-caret-down' })
                            ),
                            _react2.default.createElement(
                                'span',
                                null,
                                '<- toggle\'s right there'
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'dropdown-menu' },
                                _react2.default.createElement(
                                    'div',
                                    null,
                                    _react2.default.createElement(
                                        'span',
                                        null,
                                        _react2.default.createElement(
                                            'h1',
                                            null,
                                            'Hello'
                                        )
                                    )
                                ),
                                _react2.default.createElement(
                                    'h1',
                                    null,
                                    'World'
                                )
                            )
                        ),
                        _react2.default.createElement('br', null),
                        _react2.default.createElement('br', null),
                        _react2.default.createElement(
                            _ButtonDropdown2.default,
                            { deferDropdownRendering: true, ignoreContentClick: true },
                            _react2.default.createElement('i', { className: 'fa fa-tag' }),
                            _react2.default.createElement(
                                'span',
                                null,
                                'Arbitrary children + deferDropdown + ignore content click'
                            ),
                            _react2.default.createElement(
                                'span',
                                null,
                                'Hello'
                            ),
                            _react2.default.createElement(
                                'a',
                                { className: 'dropdown-toggle' },
                                _react2.default.createElement('i', { className: 'fa fa-fw fa-caret-down' })
                            ),
                            _react2.default.createElement(
                                'span',
                                null,
                                '<- toggle\'s right there'
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'dropdown-menu' },
                                _react2.default.createElement(
                                    'div',
                                    null,
                                    _react2.default.createElement(
                                        'span',
                                        null,
                                        _react2.default.createElement(
                                            'h1',
                                            null,
                                            'Hello'
                                        )
                                    )
                                ),
                                _react2.default.createElement(
                                    'h1',
                                    null,
                                    'World'
                                )
                            )
                        ),
                        _react2.default.createElement('br', null),
                        _react2.default.createElement('br', null),
                        _react2.default.createElement(
                            _ButtonDropdown2.default,
                            null,
                            _react2.default.createElement('i', { className: 'fa fa-tag' }),
                            _react2.default.createElement(
                                'span',
                                null,
                                'Arbitrary children + with null'
                            ),
                            _react2.default.createElement(
                                'span',
                                null,
                                'Hello'
                            ),
                            null,
                            _react2.default.createElement(
                                'a',
                                { className: 'dropdown-toggle' },
                                _react2.default.createElement('i', { className: 'fa fa-fw fa-caret-down' })
                            ),
                            _react2.default.createElement(
                                'span',
                                null,
                                '<- toggle\'s right there'
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'dropdown-menu' },
                                _react2.default.createElement(
                                    'div',
                                    null,
                                    _react2.default.createElement(
                                        'span',
                                        null,
                                        _react2.default.createElement(
                                            'h1',
                                            null,
                                            'Hello'
                                        )
                                    )
                                ),
                                _react2.default.createElement(
                                    'h1',
                                    null,
                                    'World'
                                )
                            )
                        ),
                        _react2.default.createElement('br', null),
                        _react2.default.createElement('br', null),
                        _react2.default.createElement(
                            _ButtonDropdown2.default,
                            null,
                            _react2.default.createElement('i', { className: 'fa fa-tag' }),
                            _react2.default.createElement(
                                'span',
                                null,
                                'Arbitrary children + with null - no toggle or content'
                            ),
                            _react2.default.createElement(
                                'span',
                                null,
                                ' Hello '
                            ),
                            null,
                            null && _react2.default.createElement(
                                'a',
                                { className: 'dropdown-toggle' },
                                _react2.default.createElement('i', { className: 'fa fa-fw fa-caret-down' })
                            ),
                            _react2.default.createElement(
                                'span',
                                null,
                                'no toggle'
                            ),
                            null && _react2.default.createElement(
                                'div',
                                { className: 'dropdown-menu' },
                                _react2.default.createElement(
                                    'div',
                                    null,
                                    _react2.default.createElement(
                                        'span',
                                        null,
                                        _react2.default.createElement(
                                            'h1',
                                            null,
                                            'Hello'
                                        )
                                    )
                                ),
                                _react2.default.createElement(
                                    'h1',
                                    null,
                                    'World'
                                )
                            )
                        ),
                        _react2.default.createElement('br', null),
                        _react2.default.createElement('br', null)
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'col-xs-6' },
                        'CONTROLLED',
                        _react2.default.createElement('br', null),
                        _react2.default.createElement('br', null),
                        _react2.default.createElement(
                            _ButtonDropdown2.default,
                            { open: false },
                            _react2.default.createElement(
                                'button',
                                { className: 'btn btn-default' },
                                'Never open'
                            ),
                            _react2.default.createElement(
                                'div',
                                null,
                                _react2.default.createElement(
                                    'h1',
                                    null,
                                    'Hello'
                                )
                            )
                        ),
                        _react2.default.createElement('br', null),
                        _react2.default.createElement('br', null),
                        _react2.default.createElement(
                            _ButtonDropdown2.default,
                            { ignoreContentClick: true, onToggle: function onToggle() {
                                    return _this3.setState({ controlled1Open: !_this3.state.controlled1Open });
                                }, open: this.state.controlled1Open },
                            _react2.default.createElement(
                                'button',
                                { className: 'btn btn-default' },
                                'Ignore content click respected in controlled mode'
                            ),
                            _react2.default.createElement(
                                'div',
                                null,
                                _react2.default.createElement(
                                    'button',
                                    { className: 'btn btn-primary' },
                                    'Nothing'
                                ),
                                _react2.default.createElement(
                                    'button',
                                    { onClick: function onClick() {
                                            return _this3.setState({ controlled1Open: false });
                                        }, className: 'btn btn-danger' },
                                    'Close'
                                )
                            )
                        ),
                        _react2.default.createElement('br', null),
                        _react2.default.createElement('br', null),
                        _react2.default.createElement(
                            _ButtonDropdown2.default,
                            { ignoreContentClick: true, deferDropdownRendering: true, onToggle: function onToggle() {
                                    return _this3.setState({ controlled2Open: !_this3.state.controlled2Open });
                                }, open: this.state.controlled2Open },
                            _react2.default.createElement(
                                'button',
                                { className: 'btn btn-default' },
                                'Ignore content click & deferred dropdown respected in controlled mode'
                            ),
                            _react2.default.createElement(
                                'div',
                                null,
                                _react2.default.createElement(
                                    'button',
                                    { className: 'btn btn-primary' },
                                    'Nothing'
                                ),
                                _react2.default.createElement(
                                    'button',
                                    { onClick: function onClick() {
                                            return _this3.setState({ controlled2Open: false });
                                        }, className: 'btn btn-danger' },
                                    'Close'
                                )
                            )
                        ),
                        _react2.default.createElement('br', null),
                        _react2.default.createElement('br', null),
                        _react2.default.createElement(
                            _ButtonDropdown2.default,
                            { open: this.state.controlled3Open },
                            _react2.default.createElement(
                                'button',
                                { onClick: function onClick() {
                                        return _this3.setState({ controlled3Open: true });
                                    }, className: 'btn btn-default' },
                                'Toggle button to open, red button to close. ONLY'
                            ),
                            _react2.default.createElement(
                                'div',
                                null,
                                _react2.default.createElement(
                                    'button',
                                    { className: 'btn btn-primary' },
                                    'Nothing'
                                ),
                                _react2.default.createElement(
                                    'button',
                                    { onClick: function onClick() {
                                            return _this3.setState({ controlled3Open: false });
                                        }, className: 'btn btn-danger' },
                                    'Close'
                                )
                            )
                        ),
                        _react2.default.createElement('br', null),
                        _react2.default.createElement('br', null),
                        _react2.default.createElement('br', null),
                        _react2.default.createElement(
                            'div',
                            { className: 'btn-group' },
                            ' ',
                            _react2.default.createElement(
                                _ButtonDropdown2.default,
                                { clean: true, open: this.state.controlled4Open, className: 'foo' },
                                _react2.default.createElement(
                                    'button',
                                    { onClick: function onClick() {
                                            return _this3.setState({ controlled4Open: true });
                                        }, className: 'btn btn-default' },
                                    'Toggle button to open, red button to close ONLY + clean + custom css class'
                                ),
                                _react2.default.createElement(
                                    'div',
                                    null,
                                    _react2.default.createElement(
                                        'button',
                                        { className: 'btn btn-primary' },
                                        'Nothing'
                                    ),
                                    _react2.default.createElement(
                                        'button',
                                        { onClick: function onClick() {
                                                return _this3.setState({ controlled4Open: false });
                                            }, className: 'btn btn-danger' },
                                        'Close'
                                    )
                                )
                            )
                        ),
                        _react2.default.createElement('br', null),
                        _react2.default.createElement('br', null),
                        _react2.default.createElement('br', null),
                        _react2.default.createElement(
                            _ButtonDropdown2.default,
                            { open: true },
                            _react2.default.createElement(
                                'button',
                                { className: 'btn btn-default' },
                                'Always open'
                            ),
                            _react2.default.createElement(
                                'div',
                                null,
                                _react2.default.createElement(
                                    'h1',
                                    null,
                                    'Hello'
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return TestCases;
}(_react.Component);

(0, _reactDom.render)(_react2.default.createElement(TestCases, null), document.getElementById('home'));

//bound in dom 0 handler in default.htm - to test unMount events
window.clearNavBar = function () {
    (0, _reactDom.render)(_react2.default.createElement(
        'div',
        null,
        'Gone'
    ), document.getElementById('home'));
};

exports.default = null;