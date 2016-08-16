'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var ModalBody = function ModalBody(props) {
    return _react2['default'].createElement(
        'div',
        { className: 'modal-body' },
        props.children
    );
};

var currentModal = null;
document.addEventListener('click', function (evt) {
    if (!currentModal) return;

    var element = evt.target,
        modalRoot = currentModal.modalRef,
        modalContent = modalRoot.getElementsByClassName('modal-content')[0];

    if (modalContent.contains(element)) return;

    var currentModalCopy = currentModal;
    currentModal = null;

    var backdrop = document.getElementsByClassName('simple-react-modal-backdrop')[0];
    backdrop && backdrop.classList.remove('in');
    currentModalCopy.props.onHide();
    setTimeout(function () {
        backdrop && backdrop.parentNode.removeChild(backdrop);
    }, 200);
});

var Modal = (function (_React$Component) {
    _inherits(Modal, _React$Component);

    function Modal() {
        _classCallCheck(this, Modal);

        _get(Object.getPrototypeOf(Modal.prototype), 'constructor', this).call(this);
        this.state = { exists: false, hasInCssClass: false };
    }

    _createClass(Modal, [{
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps) {
            var _this = this;

            if (!prevProps.show && this.props.show) {
                (function () {
                    var div = document.createElement('div');
                    div.classList.add('modal-backdrop', 'simple-react-modal-backdrop', 'fade');
                    document.body.appendChild(div);
                    _this.setState({ exists: true });
                    setTimeout(function () {
                        div.classList.add('in');
                        _this.setState({ hasInCssClass: true });
                    }, 1);
                    setTimeout(function () {
                        return currentModal = _this;
                    }, 100);
                })();
            } else if (prevProps.show && !this.props.show) {
                this.setState({ hasInCssClass: false });
                setTimeout(function () {
                    return _this.setState({ exists: false });
                }, 200);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var children = this.props.children;
            if (!Array.isArray(children)) {
                children = [children];
            }
            var modalBody = children.find(function (c) {
                return c.type === ModalBody;
            });

            return _react2['default'].createElement(
                'div',
                { ref: function (el) {
                        return _this2.modalRef = el;
                    }, className: 'modal fade ' + (this.state.hasInCssClass ? 'in' : ''), style: { display: this.state.exists ? 'block' : '' }, role: 'dialog' },
                _react2['default'].createElement(
                    'div',
                    { className: 'modal-dialog' },
                    _react2['default'].createElement(
                        'div',
                        { className: 'modal-content' },
                        _react2['default'].createElement(
                            'div',
                            { className: 'modal-header' },
                            _react2['default'].createElement(
                                'h4',
                                { className: 'modal-title' },
                                'Hellooooooo'
                            )
                        ),
                        modalBody || null
                    )
                )
            );
        }
    }]);

    return Modal;
})(_react2['default'].Component);

Modal.Body = ModalBody;

exports['default'] = Modal;
module.exports = exports['default'];