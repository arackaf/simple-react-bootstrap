!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},r.name);t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return D(e.substr(6));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["1"], ["2"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("1", ["2"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  Object.defineProperty(exports, '__esModule', {value: true});
  var _extends = Object.assign || function(target) {
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
  var _createClass = (function() {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ('value' in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function(Constructor, protoProps, staticProps) {
      if (protoProps)
        defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        defineProperties(Constructor, staticProps);
      return Constructor;
    };
  })();
  var _get = function get(_x, _x2, _x3) {
    var _again = true;
    _function: while (_again) {
      var object = _x,
          property = _x2,
          receiver = _x3;
      _again = false;
      if (object === null)
        object = Function.prototype;
      var desc = Object.getOwnPropertyDescriptor(object, property);
      if (desc === undefined) {
        var parent = Object.getPrototypeOf(object);
        if (parent === null) {
          return undefined;
        } else {
          _x = parent;
          _x2 = property;
          _x3 = receiver;
          _again = true;
          desc = parent = undefined;
          continue _function;
        }
      } else if ('value' in desc) {
        return desc.value;
      } else {
        var getter = desc.get;
        if (getter === undefined) {
          return undefined;
        }
        return getter.call(receiver);
      }
    }
  };
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {'default': obj};
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  function _inherits(subClass, superClass) {
    if (typeof superClass !== 'function' && superClass !== null) {
      throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }});
    if (superClass)
      Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }
  var _react = $__require('2');
  var _react2 = _interopRequireDefault(_react);
  var NavBarForm = function NavBarForm(props) {
    return _react2['default'].createElement('form', {
      onSubmit: function(evt) {
        return evt.preventDefault();
      },
      className: 'navbar-form ' + (props.pullLeft ? ' pull-left ' : '') + (props.pullRight ? ' pull-right ' : '')
    }, props.children);
  };
  var NavBarBrand = function NavBarBrand(props) {
    return _react2['default'].cloneElement(props.children, {className: 'navbar-brand'});
  };
  var NavBarToggle = function NavBarToggle(props) {
    return _react2['default'].createElement('button', _extends({}, props, {
      type: 'button',
      className: 'navbar-toggle collapsed'
    }), _react2['default'].createElement('span', {className: 'sr-only'}, 'Toggle navigation'), _react2['default'].createElement('span', {className: 'icon-bar'}), _react2['default'].createElement('span', {className: 'icon-bar'}), _react2['default'].createElement('span', {className: 'icon-bar'}));
  };
  var cloneHeaderItem = function cloneHeaderItem(item, i) {
    var key = 'item' + i + '}';
    if (item.type === NavBarToggle) {
      key = 'toggle';
    } else if (item.type === NavBarBrand) {
      key = 'header-toggle';
    }
    return _react2['default'].cloneElement(item, {key: key});
  };
  var NavBarHeader = function NavBarHeader(props) {
    return _react2['default'].createElement('div', {className: 'navbar-header'}, props.children.map(cloneHeaderItem));
  };
  var NavBarItem = function NavBarItem(props) {
    return _react2['default'].createElement('li', {active: props.active}, _react2['default'].createElement('a', {href: props.href}, props.children));
  };
  var NavBarDropdown = (function(_React$Component) {
    _inherits(NavBarDropdown, _React$Component);
    function NavBarDropdown() {
      var _this = this;
      _classCallCheck(this, NavBarDropdown);
      _get(Object.getPrototypeOf(NavBarDropdown.prototype), 'constructor', this).call(this);
      this.state = {open: false};
      this.handleOutsideClick = function(evt) {
        var element = evt.target;
        do {
          if (element.classList && element.classList.contains('dropdown-toggle')) {
            return;
          }
        } while (element = element.parentNode);
        _this.setState({open: false});
      };
      document.addEventListener('click', this.handleOutsideClick);
    }
    _createClass(NavBarDropdown, [{
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        document.removeEventListener('click', this.handleOutsideClick);
      }
    }, {
      key: 'toggle',
      value: function toggle() {
        this.setState({open: !this.state.open});
      }
    }, {
      key: 'render',
      value: function render() {
        var _this2 = this;
        var props = this.props;
        return _react2['default'].createElement('li', {className: 'dropdown ' + (this.state.open ? 'open' : '')}, _react2['default'].createElement('a', _extends({
          className: 'dropdown-toggle',
          onClick: function() {
            return _this2.toggle();
          }
        }, props), props.text, ' ', _react2['default'].createElement('span', {className: 'caret'})), _react2['default'].createElement('ul', {className: 'dropdown-menu'}, props.children));
      }
    }]);
    return NavBarDropdown;
  })(_react2['default'].Component);
  var Nav = function Nav(props) {
    return _react2['default'].createElement('ul', _extends({}, props, {className: 'nav navbar-nav'}), props.children);
  };
  var NavBar = (function(_React$Component2) {
    _inherits(NavBar, _React$Component2);
    function NavBar() {
      _classCallCheck(this, NavBar);
      _get(Object.getPrototypeOf(NavBar.prototype), 'constructor', this).call(this);
      this.state = {
        collapsed: true,
        heightExpanded: false,
        collapseHeight: null
      };
    }
    _createClass(NavBar, [{
      key: 'toggleMobileCollapse',
      value: function toggleMobileCollapse(evt) {
        var _this3 = this;
        if (this._pendingAnimationClear) {
          clearTimeout(this._pendingAnimationClear);
          this._pendingAnimationClear = null;
        }
        if (this.state.expanded || this.state.expanding) {
          this.setState({
            collapsing: true,
            collapseHeight: null,
            expanding: false,
            expanded: false
          });
          this._pendingAnimationClear = setTimeout(function() {
            _this3.setState({
              collapsing: false,
              collapseHeight: null
            });
            _this3._cachedHeight = null;
          }, 300);
        } else {
          if (!this._cachedHeight) {
            var currentNode = evt.target,
                collapseContentToToggle = undefined;
            while (currentNode = currentNode.parentNode) {
              console.log('TICK');
              if (currentNode.tagName === 'DIV') {
                collapseContentToToggle = currentNode.nextSibling;
                break;
              }
            }
            collapseContentToToggle.classList.add('in');
            var offsetHeight = collapseContentToToggle.offsetHeight;
            collapseContentToToggle.classList.remove('in');
            this._cachedHeight = offsetHeight;
          }
          this.setState({
            collapsing: true,
            expanding: true
          });
          setTimeout(function() {
            return _this3.setState({collapseHeight: _this3._cachedHeight});
          }, 2);
          this._pendingAnimationClear = setTimeout(function() {
            return _this3.setState({
              collapsing: false,
              expanded: true,
              expanding: false
            });
          }, 300);
        }
      }
    }, {
      key: 'render',
      value: function render() {
        var header = this.props.children.find(function(c) {
          return c.type === NavBarHeader;
        }),
            toggle = header ? header.props.children.find(function(c) {
              return c.type === NavBarToggle;
            }) : null,
            toggleIndex = toggle ? header.props.children.indexOf(toggle) : -1,
            navSubItems = this.props.children.filter(filterValidNavSubItems).map(function(subItem, i) {
              return _react2['default'].cloneElement(subItem, {key: 'item' + i});
            });
        if (toggleIndex >= 0) {
          header.props.children[toggleIndex] = _react2['default'].cloneElement(toggle, {onClick: this.toggleMobileCollapse.bind(this)});
        }
        return _react2['default'].createElement('nav', {className: 'navbar navbar-default'}, _react2['default'].createElement('div', {className: 'container-fluid'}, header || null, _react2['default'].createElement('div', {
          className: (this.state.collapsing ? ' collapsing ' : ' collapse ') + ' navbar-collapse ' + (this.state.expanded ? ' in ' : ''),
          style: {height: this.state.collapseHeight || null}
        }, navSubItems)));
      }
    }]);
    return NavBar;
  })(_react2['default'].Component);
  NavBar.Nav = Nav;
  NavBar.Item = NavBarItem;
  NavBar.Header = NavBarHeader;
  NavBar.Brand = NavBarBrand;
  NavBar.Toggle = NavBarToggle;
  NavBar.Dropdown = NavBarDropdown;
  NavBar.Form = NavBarForm;
  function filterValidNavSubItems(item) {
    return item.type !== NavBarHeader;
  }
  exports['default'] = NavBar;
  module.exports = exports['default'];
  return module.exports;
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["react"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("react"));
  else
    factory(React);
});