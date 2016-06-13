'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _NavBarJs = require('./NavBar.js');

var _NavBarJs2 = _interopRequireDefault(_NavBarJs);

var _reactDom = require('react-dom');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

(0, _reactDom.render)(_react2['default'].createElement(
    _NavBarJs2['default'],
    null,
    _react2['default'].createElement(
        _NavBarJs2['default'].Header,
        null,
        _react2['default'].createElement(
            _NavBarJs2['default'].Brand,
            null,
            _react2['default'].createElement(
                'a',
                { style: { cursor: 'pointer' } },
                'Header'
            )
        ),
        _react2['default'].createElement(_NavBarJs2['default'].Toggle, null)
    ),
    _react2['default'].createElement(
        _NavBarJs2['default'].Nav,
        null,
        _react2['default'].createElement(
            _NavBarJs2['default'].Item,
            null,
            'Link 1'
        ),
        _react2['default'].createElement(
            _NavBarJs2['default'].Item,
            { active: true },
            'Link 2'
        ),
        _react2['default'].createElement(
            _NavBarJs2['default'].Item,
            { href: 'http://www.google.com' },
            'Link 3'
        ),
        _react2['default'].createElement(
            _NavBarJs2['default'].Dropdown,
            { text: 'Sub menu' },
            _react2['default'].createElement(
                _NavBarJs2['default'].Item,
                null,
                'Sub option a'
            ),
            _react2['default'].createElement(
                _NavBarJs2['default'].Item,
                null,
                'Sub option b'
            ),
            _react2['default'].createElement(
                _NavBarJs2['default'].Item,
                null,
                'Sub option c'
            )
        )
    ),
    _react2['default'].createElement(
        _NavBarJs2['default'].Form,
        { pullLeft: true },
        _react2['default'].createElement(
            'div',
            { className: 'form-group' },
            _react2['default'].createElement(
                'div',
                { className: 'input-group' },
                _react2['default'].createElement(
                    'span',
                    { className: 'input-group-btn' },
                    _react2['default'].createElement(
                        'button',
                        { className: 'btn default' },
                        'Search'
                    )
                ),
                _react2['default'].createElement('input', { className: 'form-control', placeholder: 'Quick title search' })
            )
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