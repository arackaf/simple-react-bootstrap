'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _reactDom = require('react-dom');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _srcButtonDropdown = require('../src/ButtonDropdown');

var _srcButtonDropdown2 = _interopRequireDefault(_srcButtonDropdown);

(0, _reactDom.render)(_react2['default'].createElement(
    _srcButtonDropdown2['default'],
    null,
    _react2['default'].createElement(
        'button',
        { className: 'btn btn-default' },
        'Y ',
        _react2['default'].createElement('i', { className: 'fa fa-fw fa-tag' })
    ),
    _react2['default'].createElement(
        'div',
        { className: 'dropdown-menu' },
        _react2['default'].createElement(
            'h1',
            null,
            'Hello'
        )
    )
), document.getElementById('home'));

//bound in dom 0 handler in default.htm - to test unMount events
window.clearNavBar = function () {
    (0, _reactDom.render)(_react2['default'].createElement(
        'div',
        null,
        'Gone'
    ), document.getElementById('home'));
};

exports['default'] = null;
module.exports = exports['default'];