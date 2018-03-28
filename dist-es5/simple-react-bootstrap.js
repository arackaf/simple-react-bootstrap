import React, { Children, Component, cloneElement, createElement } from 'react';
import { findDOMNode, render, unmountComponentAtNode } from 'react-dom';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};



var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};









var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};



















var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

var ButtonDropdown = function (_Component) {
    inherits(ButtonDropdown, _Component);

    function ButtonDropdown() {
        var _ref;

        var _temp, _this, _ret;

        classCallCheck(this, ButtonDropdown);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = ButtonDropdown.__proto__ || Object.getPrototypeOf(ButtonDropdown)).call.apply(_ref, [this].concat(args))), _this), _this.state = { open: false }, _this.documentClick = function (evt) {
            var toggleBtnDomNode = void 0;
            if (_this.toggleBtn) {
                if (_this.toggleBtn instanceof Component) {
                    toggleBtnDomNode = findDOMNode(_this.toggleBtn);
                } else {
                    toggleBtnDomNode = _this.toggleBtn;
                }
            }

            if (toggleBtnDomNode && toggleBtnDomNode.contains(evt.target)) return;

            var isOpen = typeof _this.props.open !== 'undefined' ? _this.props.open : _this.state.open;
            var keepOpenIfItemClickedNoLongerInDocument = _this.props.keepOpenIfItemClickedNoLongerInDocument;


            if (isOpen) {
                if (_this.props.ignoreContentClick) {
                    var contentMenuNode = void 0;
                    if (_this.contentMenu) {
                        if (_this.contentMenu instanceof Component) {
                            contentMenuNode = findDOMNode(_this.contentMenu);
                        } else {
                            contentMenuNode = _this.contentMenu;
                        }
                    }

                    if (contentMenuNode && contentMenuNode.contains(evt.target)) return;
                    //adding for a specific use case that may not even be reproducable depending on circumstance.  Keeping undocumented for now.
                    if (keepOpenIfItemClickedNoLongerInDocument && !document.contains(evt.target)) return;
                }

                if (_this.props.onToggle) {
                    _this.props.onToggle(evt);
                } else {
                    _this.toggle();
                }
            }
        }, _this.toggle = function () {
            return _this.setState({ open: !_this.state.open });
        }, _temp), possibleConstructorReturn(_this, _ret);
    }

    createClass(ButtonDropdown, [{
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
        value: function render$$1() {
            var _this2 = this;

            var _props = this.props,
                children = _props.children,
                _props$className = _props.className,
                className = _props$className === undefined ? '' : _props$className,
                _props$containerEleme = _props.containerElementType,
                containerElementType = _props$containerEleme === undefined ? 'div' : _props$containerEleme,
                _props$disabled = _props.disabled,
                disabled = _props$disabled === undefined ? false : _props$disabled,
                ignoreContentClick = _props.ignoreContentClick,
                deferDropdownRendering = _props.deferDropdownRendering,
                onToggle = _props.onToggle,
                open = _props.open,
                clean = _props.clean,
                keepOpenIfItemClickedNoLongerInDocument = _props.keepOpenIfItemClickedNoLongerInDocument,
                rest = objectWithoutProperties(_props, ['children', 'className', 'containerElementType', 'disabled', 'ignoreContentClick', 'deferDropdownRendering', 'onToggle', 'open', 'clean', 'keepOpenIfItemClickedNoLongerInDocument']);


            if (!Array.isArray(children)) {
                throw 'Error - at least two children should be passed: a toggle, and dropdown menu, at a minimum';
            }

            var toggleUnadjusted = void 0,
                contentUnadjusted = void 0,
                toggleClasses = '',
                contentClasses = '';

            if (children.length === 2) {
                toggleUnadjusted = children[0];
                contentUnadjusted = children[1];

                toggleClasses = ' dropdown-toggle ';
                contentClasses = ' dropdown-menu  ';
            } else {
                toggleUnadjusted = children.find(function (child) {
                    return child && child.props && /\bdropdown-toggle\b/.test(child.props.className);
                });
                contentUnadjusted = children.find(function (child) {
                    return child && child.props && /\bdropdown-menu\b/.test(child.props.className);
                });
            }

            var rootCssToAdd = clean ? '' : ' btn-group ';
            var toggle = void 0;
            if (toggleUnadjusted) {
                //when the toggle button is clicked, click THIS method, in addition to any onClick method supplied by the user. Do not call regular toggle method in controlled mode
                var rootToggleClick = this.props.onToggle || (typeof this.props.open === 'undefined' ? this.toggle : function () {});
                var toggleClick = toggleUnadjusted.props.onClick ? function (evt) {
                    if (disabled) return;
                    toggleUnadjusted.props.onClick();
                    rootToggleClick(evt);
                } : !disabled ? rootToggleClick : function () {};
                toggle = React.cloneElement(toggleUnadjusted, {
                    className: toggleClasses + (toggleUnadjusted.props.className || ''),
                    onClick: toggleClick,
                    ref: function ref(el) {
                        return _this2.toggleBtn = el;
                    }
                });
            }

            var content = void 0;
            if (contentUnadjusted) {
                content = React.cloneElement(contentUnadjusted, {
                    className: contentClasses + (contentUnadjusted.props.className || ''),
                    ref: function ref(el) {
                        return _this2.contentMenu = el;
                    }
                });
            }

            var isOpen = typeof this.props.open !== 'undefined' ? this.props.open : this.state.open,
                classToAdd = [className, rootCssToAdd, isOpen ? 'open' : null].filter(function (s) {
                return s;
            }).join(' ');

            //simple case
            if (children.length === 2) {
                return createElement(containerElementType, _extends({ className: classToAdd }, rest), React.cloneElement(toggle, { disabled: disabled }), !this.props.deferDropdownRendering || isOpen ? content : null);
            } else {
                var childrenToUse = [].concat(toConsumableArray(children));
                if (toggleUnadjusted) {
                    childrenToUse.splice(childrenToUse.indexOf(toggleUnadjusted), 1, toggle);
                }
                if (contentUnadjusted) {
                    childrenToUse.splice(childrenToUse.indexOf(contentUnadjusted), 1, !this.props.deferDropdownRendering || isOpen ? content : null);
                }

                return createElement.apply(undefined, [containerElementType, _extends({ className: classToAdd }, rest)].concat(toConsumableArray(childrenToUse)));
            }
        }
    }]);
    return ButtonDropdown;
}(Component);

var spreadClassNames = function spreadClassNames(userClassName, baseCssClasses) {
    return (baseCssClasses || '') + ' ' + (userClassName || '');
};

var ModalHeader = function ModalHeader(props) {
    var _props$className = props.className,
        className = _props$className === undefined ? '' : _props$className,
        children = props.children,
        rest = objectWithoutProperties(props, ['className', 'children']);

    return React.createElement(
        'div',
        _extends({ className: "modal-header " + className }, rest),
        props.children
    );
};

var ModalFooter = function ModalFooter(props) {
    var _props$className2 = props.className,
        className = _props$className2 === undefined ? '' : _props$className2,
        children = props.children,
        rest = objectWithoutProperties(props, ['className', 'children']);

    return React.createElement(
        'div',
        _extends({ className: "modal-footer " + className }, rest),
        props.children
    );
};

var ModalBody = function ModalBody(props) {
    var _props$className3 = props.className,
        className = _props$className3 === undefined ? '' : _props$className3,
        children = props.children,
        rest = objectWithoutProperties(props, ['className', 'children']);

    return React.createElement(
        'div',
        _extends({ className: "modal-body " + className }, rest),
        props.children
    );
};

var currentModals = [];

var ESC_KEY = 27;

window.addEventListener('keydown', function (evt) {
    var key = evt.keyCode || evt.which;

    if (key == ESC_KEY) {
        if (currentModals.length) {
            currentModals[currentModals.length - 1].props.onHide();
        }
    }
});

function removeBackdrop() {
    var backdrop = document.getElementsByClassName('simple-react-modal-backdrop')[0];
    if (!backdrop) return;
    backdrop.classList.remove('simple-react-modal-backdrop');

    var isAnimating = /\bfade\b/.test(backdrop.className);

    if (!isAnimating) {
        backdrop.parentNode.removeChild(backdrop);
    } else {
        backdrop.classList.remove('in');
        setTimeout(function () {
            return backdrop.parentNode.removeChild(backdrop);
        }, 200);
    }
}

var uuid = 1;

var Modal = function (_React$Component) {
    inherits(Modal, _React$Component);

    function Modal() {
        var _ref;

        var _temp, _this, _ret;

        classCallCheck(this, Modal);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = Modal.__proto__ || Object.getPrototypeOf(Modal)).call.apply(_ref, [this].concat(args))), _this), _this.portalState = { exists: false, hasInCssClass: false }, _this.mergePortalState = function (newState, cb) {
            Object.assign(_this.portalState, newState);
            _this.renderModal(cb);
        }, _this.__showingUid = 0, _this.__bumpUid = function () {
            return _this.__showingUid++;
        }, _this.modalClick = function (evt) {
            var activeModal = currentModals[currentModals.length - 1];
            if (activeModal === _this && evt.target === evt.currentTarget) {
                _this.props.onHide();
            }
        }, _this.initialMount = function (el) {
            if (el) {
                _this.modalRef = el;
                if (_this.props.show) {
                    _this._showModal();
                }
            }
        }, _this._hideModal = function () {
            _this.__bumpUid();
            var correctUid = _this.__showingUid;
            var isAnimating = /\bfade\b/.test(_this.modalRef.className);

            if (isAnimating) {
                _this.mergePortalState({ hasInCssClass: false });
                setTimeout(function () {
                    if (correctUid !== _this.__showingUid) return;
                    _this.mergePortalState({ exists: false });
                }, 200);
            } else {
                _this.mergePortalState({ hasInCssClass: false, exists: false });
            }

            if (currentModals.length <= 1) {
                //less than since it may have been closed before modal was activated
                document.body.classList.remove('modal-open');
                removeBackdrop();
            }
            if (currentModals[currentModals.length - 1] == _this) {
                currentModals.pop();
            }
        }, _temp), possibleConstructorReturn(_this, _ret);
    }

    createClass(Modal, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.__div = document.createElement('div');
            this.__div.id = '__simple-react-bootstrap-modal' + uuid++;
            document.body.appendChild(this.__div);
            this.renderModal();
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {
            if (!prevProps.show && this.props.show) {
                this._showModal();
            } else if (prevProps.show && !this.props.show) {
                this._hideModal();
            } else {
                this.renderModal();
            }
        }
    }, {
        key: '_showModal',
        value: function _showModal() {
            var _this2 = this;

            this.__bumpUid();
            var correctUid = this.__showingUid;
            var div = !currentModals.length ? document.createElement('div') : null,
                isAnimating = /\bfade\b/.test(this.modalRef.className);

            if (div) {
                var _div$classList;

                (_div$classList = div.classList).add.apply(_div$classList, ['modal-backdrop', 'simple-react-modal-backdrop', isAnimating ? 'fade' : 'in']);
            }

            if (isAnimating) {
                if (div) {
                    document.body.appendChild(div);
                }
                //raf not seeming to get the job done - disabling for now
                var onNext = function onNext(cb) {
                    return window.__requestAnimationFrame ? requestAnimationFrame(cb) : setTimeout(cb, 2);
                };

                this.mergePortalState({ exists: true }, function () {
                    return onNext(function () {
                        return _this2.mergePortalState({ hasInCssClass: true });
                    });
                });
                onNext(function () {
                    if (div) {
                        div.classList.add('in');
                    }
                    document.body.classList.add('modal-open');
                });
                //provide some small delay before this modal is eligible to be closed.  We don't want a double click to open / show the modal.

                setTimeout(function () {
                    if (correctUid !== _this2.__showingUid) return;
                    currentModals.push(_this2);
                }, 200);
            } else {
                if (div) {
                    document.body.appendChild(div);
                }
                this.mergePortalState({ exists: true, hasInCssClass: true });
                currentModals.push(this);
                document.body.classList.add('modal-open');
            }
        }
    }, {
        key: 'render',
        value: function render$$1() {
            return React.createElement('div', null);
        }
    }, {
        key: 'renderModal',
        value: function renderModal(cb) {
            var _props = this.props,
                children = _props.children,
                manual = _props.manual,
                show = _props.show,
                onHide = _props.onHide,
                className = _props.className,
                style = _props.style,
                rest = objectWithoutProperties(_props, ['children', 'manual', 'show', 'onHide', 'className', 'style']);


            render(React.createElement(
                'div',
                _extends({ ref: this.initialMount, onClick: this.modalClick, className: spreadClassNames(className, 'modal ' + (this.portalState.hasInCssClass ? 'in' : '')), style: _extends({}, style, { display: this.portalState.exists ? 'block' : '' }) }, rest, { role: 'dialog' }),
                manual ? children : React.createElement(
                    'div',
                    { className: 'modal-dialog' },
                    React.createElement(
                        'div',
                        { className: 'modal-content' },
                        children
                    )
                )
            ), this.__div, cb);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            var _this3 = this;

            var index = currentModals.indexOf(this);
            if (this.props.show) {
                this._hideModal();
            }
            if (index >= 0) {
                currentModals.splice(index, 1);
                if (!currentModals.length) {
                    removeBackdrop();
                }
            }
            setTimeout(function () {
                unmountComponentAtNode(_this3.__div);
                setTimeout(function () {
                    return document.body.removeChild(_this3.__div);
                }, 100);
            }, 1000);
        }
    }]);
    return Modal;
}(React.Component);

Modal.Body = ModalBody;
Modal.Header = ModalHeader;
Modal.Footer = ModalFooter;

var COLLAPSE_TIMEOUT = 355;

var spreadClassNames$1 = function spreadClassNames() {
    for (var _len = arguments.length, userClasses = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        userClasses[_key - 1] = arguments[_key];
    }

    var baseCssClasses = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    return baseCssClasses + ' ' + userClasses.join(' ');
};

var NavBarForm = function NavBarForm(props) {
    var className = props.className,
        style = props.style,
        rest = objectWithoutProperties(props, ['className', 'style']);


    return React.createElement(
        'form',
        _extends({ onSubmit: function onSubmit(evt) {
                return evt.preventDefault();
            }, className: spreadClassNames$1(className, 'navbar-form'), style: style }, rest),
        props.children
    );
};

var NavBarBrand = function NavBarBrand(props) {
    return React.cloneElement(props.children, { className: 'navbar-brand', key: 'nav-bar-brand' });
};

var NavBarToggle = function NavBarToggle(props) {
    return React.createElement(
        'button',
        _extends({}, props, { type: 'button', className: 'navbar-toggle collapsed' }),
        React.createElement(
            'span',
            { className: 'sr-only' },
            'Toggle navigation'
        ),
        React.createElement('span', { className: 'icon-bar' }),
        React.createElement('span', { className: 'icon-bar' }),
        React.createElement('span', { className: 'icon-bar' })
    );
};

var NavBarHeader = function (_React$Component) {
    inherits(NavBarHeader, _React$Component);

    function NavBarHeader() {
        classCallCheck(this, NavBarHeader);
        return possibleConstructorReturn(this, (NavBarHeader.__proto__ || Object.getPrototypeOf(NavBarHeader)).apply(this, arguments));
    }

    createClass(NavBarHeader, [{
        key: 'render',
        value: function render$$1() {
            var _this2 = this;

            var _props = this.props,
                children = _props.children,
                onClick = _props.onClick;

            return React.createElement(
                'div',
                { className: 'navbar-header', ref: function ref(el) {
                        return _this2.el = el;
                    } },
                React.Children.map(children, function (child) {
                    return child.type === NavBarToggle ? React.cloneElement(child, { onClick: onClick, key: 'nav-bar-toggle' }) : child;
                })
            );
        }
    }]);
    return NavBarHeader;
}(React.Component);

var NavBarItem = function NavBarItem(props) {
    var disabled = props.disabled,
        className = props.className,
        active = props.active,
        href = props.href,
        children = props.children,
        rest = objectWithoutProperties(props, ['disabled', 'className', 'active', 'href', 'children']);


    return React.createElement(
        'li',
        _extends({ disabled: !!disabled, className: spreadClassNames$1(className, !!disabled ? 'disabled' : '', active ? 'active' : '') }, rest),
        React.createElement(
            'a',
            { href: href },
            children
        )
    );
};

var NavBarItemDivider = function NavBarItemDivider(props) {
    return React.createElement('li', { role: 'separator', className: 'divider' });
};

var NavBarDropdown = function NavBarDropdown(props) {
    var toggleClassName = props.toggleClassName,
        style = props.style,
        disabled = props.disabled,
        text = props.text,
        children = props.children,
        _props$ignoreContentC = props.ignoreContentClick,
        ignoreContentClick = _props$ignoreContentC === undefined ? false : _props$ignoreContentC,
        rest = objectWithoutProperties(props, ['toggleClassName', 'style', 'disabled', 'text', 'children', 'ignoreContentClick']);


    return React.createElement(
        ButtonDropdown,
        { containerElementType: 'li', clean: true, ignoreContentClick: ignoreContentClick, className: 'dropdown ' + (!!disabled ? 'disabled' : ''), disabled: !!disabled },
        React.createElement(
            'a',
            _extends({ className: spreadClassNames$1(toggleClassName, 'dropdown-toggle'), style: style || {} }, rest),
            text,
            ' ',
            React.createElement('span', { className: 'caret' })
        ),
        React.createElement(
            'ul',
            { className: 'dropdown-menu' },
            children
        )
    );
};

var Nav = function Nav(_ref) {
    var _ref$className = _ref.className,
        className = _ref$className === undefined ? '' : _ref$className,
        props = objectWithoutProperties(_ref, ['className']);
    return React.createElement(
        'ul',
        _extends({}, props, { className: "nav navbar-nav " + className }),
        props.children
    );
};

var NavBar = function (_React$Component2) {
    inherits(NavBar, _React$Component2);

    function NavBar() {
        var _ref2;

        var _temp, _this3, _ret;

        classCallCheck(this, NavBar);

        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
        }

        return _ret = (_temp = (_this3 = possibleConstructorReturn(this, (_ref2 = NavBar.__proto__ || Object.getPrototypeOf(NavBar)).call.apply(_ref2, [this].concat(args))), _this3), _this3.state = { collapsed: true, heightExpanded: false, collapseHeight: null }, _this3._clearAnimation = function () {
            if (_this3._pendingAnimationClear) {
                clearTimeout(_this3._pendingAnimationClear);
                _this3._pendingAnimationClear = null;
            }
        }, _this3.closeIfOpen = function () {
            if (_this3.state.expanding || _this3.state.expanded) {
                _this3.close();
            }
        }, _this3.close = function () {
            _this3.setState({ collapsing: true, collapseHeight: null, expanding: false, expanded: false });
            _this3._pendingAnimationClear = setTimeout(function () {
                _this3.setState({ collapsing: false, collapseHeight: null });
                _this3._cachedHeight = null;
            }, COLLAPSE_TIMEOUT);
        }, _this3.expand = function () {
            if (!_this3._cachedHeight) {
                var headerNode = _this3.headerEl.el,
                    collapseContentToToggle = headerNode.nextSibling;

                collapseContentToToggle.style.visibility = 'hidden';
                collapseContentToToggle.classList.add('in');
                var offsetHeight = collapseContentToToggle.offsetHeight;
                collapseContentToToggle.style.visibility = '';
                collapseContentToToggle.classList.remove('in');

                _this3._cachedHeight = offsetHeight;
            }

            _this3.setState({ collapsing: true, expanding: true });
            setTimeout(function () {
                return _this3.setState({ collapseHeight: _this3._cachedHeight });
            }, 2);

            _this3._pendingAnimationClear = setTimeout(function () {
                return _this3.setState({ collapsing: false, expanded: true, expanding: false });
            }, COLLAPSE_TIMEOUT);
        }, _temp), possibleConstructorReturn(_this3, _ret);
    }

    createClass(NavBar, [{
        key: 'toggleMobileCollapse',
        value: function toggleMobileCollapse() {
            this._clearAnimation();
            if (this.state.expanded || this.state.expanding) {
                this.close();
            } else {
                this.expand();
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            clearTimeout(this._pendingAnimationClear);
        }
    }, {
        key: 'render',
        value: function render$$1() {
            var _this4 = this;

            var header = this.props.children.find(function (c) {
                return c.type === NavBarHeader;
            }),
                navSubItems = this.props.children.filter(function (el) {
                return el != header;
            });

            if (header) {
                header = React.cloneElement(header, { onClick: this.toggleMobileCollapse.bind(this), ref: function ref(el) {
                        return _this4.headerEl = el;
                    } });
            }

            var _props2 = this.props,
                style = _props2.style,
                _props2$className = _props2.className,
                className = _props2$className === undefined ? '' : _props2$className,
                rest = objectWithoutProperties(_props2, ['style', 'className']);


            return React.createElement(
                'nav',
                _extends({ className: 'navbar navbar-default ' + className, style: style }, rest),
                React.createElement(
                    'div',
                    { className: 'container-fluid' },
                    header || null,
                    React.createElement(
                        'div',
                        { className: (this.state.collapsing ? ' collapsing ' : ' collapse ') + ' navbar-collapse ' + (this.state.expanded ? ' in ' : ''), style: { height: this.state.collapseHeight || null } },
                        navSubItems
                    )
                )
            );
        }
    }]);
    return NavBar;
}(React.Component);

NavBar.Nav = Nav;
NavBar.Item = NavBarItem;
NavBar.ItemDivider = NavBarItemDivider;
NavBar.Header = NavBarHeader;
NavBar.Brand = NavBarBrand;
NavBar.Toggle = NavBarToggle;
NavBar.Dropdown = NavBarDropdown;
NavBar.Form = NavBarForm;

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

function _objectWithoutProperties(obj, keys) {
    var target = {};for (var i in obj) {
        if (keys.indexOf(i) >= 0) continue;if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;target[i] = obj[i];
    }return target;
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Tabs$2 = function (_Component) {
    _inherits(Tabs, _Component);

    function Tabs() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Tabs);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Tabs.__proto__ || Object.getPrototypeOf(Tabs)).call.apply(_ref, [this].concat(args))), _this), _this.state = { currentTab: _this.props.defaultTab }, _this.tabSelect = function (name) {
            _this.isControlled ? _this.props.onChangeTab && _this.props.onChangeTab(name) : _this.setState(function () {
                return { currentTab: name };
            });
        }, _this.isControlled = typeof _this.props.tab !== 'undefined' || typeof _this.props.onChangeTab !== 'undefined', _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Tabs, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            var self = this;

            var TabLink = function (_Component2) {
                _inherits(TabLink, _Component2);

                function TabLink() {
                    var _ref2;

                    var _temp2, _this2, _ret2;

                    _classCallCheck(this, TabLink);

                    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                        args[_key2] = arguments[_key2];
                    }

                    return _ret2 = (_temp2 = (_this2 = _possibleConstructorReturn(this, (_ref2 = TabLink.__proto__ || Object.getPrototypeOf(TabLink)).call.apply(_ref2, [this].concat(args))), _this2), _this2.onClick = function (evt) {
                        evt.preventDefault();
                        if (_this2.props.onClick) {
                            _this2.props.onClick();
                        }
                        self.tabSelect(_this2.props.tab);
                    }, _temp2), _possibleConstructorReturn(_this2, _ret2);
                }

                _createClass(TabLink, [{
                    key: 'render',
                    value: function render$$1() {
                        var _props = this.props,
                            children = _props.children,
                            onClick = _props.onClick,
                            href = _props.href,
                            tab = _props.tab,
                            rest = _objectWithoutProperties(_props, ['children', 'onClick', 'href', 'tab']);

                        return React.createElement('a', { href: href || '#' + tab, onClick: this.onClick }, children);
                    }
                }]);

                return TabLink;
            }(Component);

            var TabHeader = function (_Component3) {
                _inherits(TabHeader, _Component3);

                function TabHeader() {
                    _classCallCheck(this, TabHeader);

                    return _possibleConstructorReturn(this, (TabHeader.__proto__ || Object.getPrototypeOf(TabHeader)).apply(this, arguments));
                }

                _createClass(TabHeader, [{
                    key: 'render',
                    value: function render$$1() {
                        var _props2 = this.props,
                            render$$1 = _props2.render,
                            child = _props2.children,
                            propsToPass = { isActive: self.currentTab == this.props.tab };

                        return render$$1 ? render$$1(propsToPass) : cloneElement(Children.only(child), propsToPass);
                    }
                }]);

                return TabHeader;
            }(Component);

            var TabPane = function (_Component4) {
                _inherits(TabPane, _Component4);

                function TabPane() {
                    _classCallCheck(this, TabPane);

                    return _possibleConstructorReturn(this, (TabPane.__proto__ || Object.getPrototypeOf(TabPane)).apply(this, arguments));
                }

                _createClass(TabPane, [{
                    key: 'render',
                    value: function render$$1() {
                        var _props3 = this.props,
                            render$$1 = _props3.render,
                            child = _props3.children,
                            propsToPass = { isActive: self.currentTab == this.props.tab };

                        return self.currentTab == this.props.tab || this.props.renderInActiveTabs ? render$$1 ? render$$1({ isActive: self.currentTab == this.props.tab }) : cloneElement(Children.only(child), propsToPass) : null;
                    }
                }]);

                return TabPane;
            }(Component);

            this.TabLink = TabLink;
            this.TabHeader = TabHeader;
            this.TabPane = TabPane;
        }
    }, {
        key: 'render',
        value: function render$$1() {
            var renderTabs = this.props.children,
                TabLink = this.TabLink,
                TabHeader = this.TabHeader,
                TabPane = this.TabPane;

            return renderTabs({ TabLink: TabLink, TabHeader: TabHeader, TabPane: TabPane });
        }
    }, {
        key: 'currentTab',
        get: function get$$1() {
            return this.isControlled ? this.props.tab : this.state.currentTab;
        }
    }]);

    return Tabs;
}(Component);

var Tab = function (_Component) {
    inherits(Tab, _Component);

    function Tab() {
        classCallCheck(this, Tab);
        return possibleConstructorReturn(this, (Tab.__proto__ || Object.getPrototypeOf(Tab)).apply(this, arguments));
    }

    createClass(Tab, [{
        key: 'render',
        value: function render$$1() {
            return null;
        }
    }]);
    return Tab;
}(Component);

var Tabs = function (_Component2) {
    inherits(Tabs, _Component2);

    function Tabs(props) {
        classCallCheck(this, Tabs);

        var _this2 = possibleConstructorReturn(this, (Tabs.__proto__ || Object.getPrototypeOf(Tabs)).call(this, props));

        _this2.tabSelect = function (name) {
            return _this2.setState({ currentTab: name });
        };

        var firstTab = Children.toArray(_this2.props.children)[0],
            defaultTab = _this2.props.defaultTab || firstTab && firstTab.tab || 0;

        _this2.state = { defaultTab: defaultTab };
        return _this2;
    }

    createClass(Tabs, [{
        key: 'render',
        value: function render$$1() {
            var children = Children.toArray(this.props.children),
                tabs = children.filter(function (c) {
                return c.type == Tab;
            }),
                _props = this.props,
                _props$headerClassnam = _props.headerClassname,
                headerClassname = _props$headerClassnam === undefined ? '' : _props$headerClassnam,
                _props$headerStyle = _props.headerStyle,
                headerStyle = _props$headerStyle === undefined ? {} : _props$headerStyle;


            return React.createElement(
                Tabs$2,
                { tab: this.props.tab, onChangeTab: this.props.onChangeTab, defaultTab: this.state.defaultTab },
                function (_ref) {
                    var TabLink = _ref.TabLink,
                        TabHeader = _ref.TabHeader,
                        TabPane = _ref.TabPane;
                    return React.createElement(
                        'div',
                        null,
                        React.createElement(
                            'ul',
                            { className: 'nav nav-tabs ' + headerClassname, style: headerStyle },
                            tabs.map(function (tab, i) {
                                var _tab$props = tab.props,
                                    name = _tab$props.name,
                                    _tab$props$className = _tab$props.className,
                                    className = _tab$props$className === undefined ? '' : _tab$props$className,
                                    paneProps = _tab$props.paneProps,
                                    caption = _tab$props.caption,
                                    rest = objectWithoutProperties(_tab$props, ['name', 'className', 'paneProps', 'caption']),
                                    id = name || i;

                                return React.createElement(TabHeader, _extends({}, rest, { key: id, tab: id, render: function render$$1(_ref2) {
                                        var isActive = _ref2.isActive;
                                        return React.createElement(
                                            'li',
                                            _extends({}, rest, { className: (className || '') + ' ' + (isActive ? ' active ' : '') }),
                                            React.createElement(
                                                TabLink,
                                                { tab: tab.props.name || i },
                                                caption
                                            )
                                        );
                                    } }));
                            })
                        ),
                        React.createElement(
                            'div',
                            { className: 'tab-content' },
                            tabs.map(function (tab, i) {
                                var _tab$props2 = tab.props,
                                    name = _tab$props2.name,
                                    _tab$props2$className = _tab$props2.className,
                                    className = _tab$props2$className === undefined ? '' : _tab$props2$className,
                                    _tab$props2$paneProps = _tab$props2.paneProps,
                                    paneProps = _tab$props2$paneProps === undefined ? {} : _tab$props2$paneProps,
                                    rest = objectWithoutProperties(_tab$props2, ['name', 'className', 'paneProps']),
                                    _paneProps$classNameP = paneProps.classNamePane,
                                    classNamePane = _paneProps$classNameP === undefined ? '' : _paneProps$classNameP,
                                    restPane = objectWithoutProperties(paneProps, ['classNamePane']),
                                    id = name || i;

                                return React.createElement(TabPane, { key: id, tab: id, render: function render$$1(_ref3) {
                                        var isActive = _ref3.isActive;
                                        return React.createElement(
                                            'div',
                                            _extends({}, restPane, { className: classNamePane + ' tab-pane ' + (isActive ? ' active in ' : '') }),
                                            tab.props.children
                                        );
                                    } });
                            })
                        )
                    );
                }
            );
        }
    }]);
    return Tabs;
}(Component);

export { ButtonDropdown, Modal, NavBar, Tabs, Tab };
