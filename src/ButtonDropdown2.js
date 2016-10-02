'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var ButtonDropdown = (function (_Component) {
    _inherits(ButtonDropdown, _Component);

    function ButtonDropdown() {
        var _this = this;

        _classCallCheck(this, ButtonDropdown);

        _get(Object.getPrototypeOf(ButtonDropdown.prototype), 'constructor', this).apply(this, arguments);

        this.state = { open: false };

        this.documentClick = function (evt) {
            if (_this.toggleBtn.contains(evt.target)) return;
            if (_this.state.open) {
                if (_this.props.ignoreContentClick) {
                    if (_this.contentMenu.contains(evt.target)) return;
                }

                _this.toggle();
            }
        };

        this.toggle = function () {
            return _this.setState({ open: !_this.state.open });
        };
    }

    _createClass(ButtonDropdown, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            document.addEventListener('click', this.documentClick);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            document.removeEventListener('click', this.documentClick);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props;
            var children = _props.children;
            var _props$className = _props.className;
            var className = _props$className === undefined ? '' : _props$className;
            var _props$containerElementType = _props.containerElementType;
            var containerElementType = _props$containerElementType === undefined ? 'div' : _props$containerElementType;
            var ignoreContentClick = _props.ignoreContentClick;
            var deferDropdownRendering = _props.deferDropdownRendering;

            var rest = _objectWithoutProperties(_props, ['children', 'className', 'containerElementType', 'ignoreContentClick', 'deferDropdownRendering']);

            if (!Array.isArray(children) || children.length !== 2) {
                throw 'Error - exactly two children should be passed, a toggle, and dropdown menu';
            }

            var toggleUnadjusted = children[0],
                contentUnadjusted = children[1];

            var toggleClasses = 'dropdown-toggle ' + (toggleUnadjusted.props.className || ''),
                toggleClick = toggleUnadjusted.props.onClick || this.toggle;
            var toggle = _react2['default'].cloneElement(toggleUnadjusted, {
                className: toggleClasses,
                onClick: toggleClick,
                ref: function ref(el) {
                    return _this2.toggleBtn = el;
                }
            });

            var content = _react2['default'].cloneElement(contentUnadjusted, {
                className: 'dropdown-menu ' + (contentUnadjusted.props.className || ''),
                ref: function ref(el) {
                    return _this2.contentMenu = el;
                }
            });

            return (0, _react.createElement)(containerElementType, _extends({ className: className + ' btn-group ' + (this.state.open ? 'open' : '') }, rest), toggle, !this.props.deferDropdownRendering || this.state.open ? content : null);
        }
    }]);

    return ButtonDropdown;
})(_react.Component);

exports['default'] = ButtonDropdown;
module.exports = exports['default'];