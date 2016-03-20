'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mousetrap2 = require('mousetrap');

var _mousetrap3 = _interopRequireDefault(_mousetrap2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

var MousetrapMixin = {
  _mousetrap: {},

  _bind: function _bind() {
    var _this = this;

    Object.keys(this._mousetrap).forEach(function (key) {
      if (typeof _this._mousetrap[key] === 'function') {
        _mousetrap3.default.bind(key, _this._mousetrap[key]);
      } else if (_typeof(_this._mousetrap[key]) === 'object') {
        _mousetrap3.default.bind(key, _this._mousetrap[key].callback, _this._mousetrap[key].action);
      }
    });
  },
  _unbind: function _unbind() {
    var _this2 = this;

    Object.keys(this._mousetrap).forEach(function (key) {
      if (typeof _this2._mousetrap[key] === 'function') {
        _mousetrap3.default.unbind(key);
      } else if (_typeof(_this2._mousetrap[key]) === 'object') {
        _mousetrap3.default.unbind(key, _this2._mousetrap[key].action);
      }
      delete _this2._mousetrap[key];
    });
  },
  addMousetrap: function addMousetrap(key, callback, action) {
    if (typeof callback === 'function') {
      _mousetrap3.default.bind(key, callback, action);
      this._mousetrap[key] = { callback: callback, action: action };
    }
  },
  removeMousetrap: function removeMousetrap(key, action) {
    _mousetrap3.default.unbind(key, action);
    delete this._mousetrap[key];
  },
  componentDidMount: function componentDidMount() {
    this._mousetrap = this.props.mousetrap;
    if (!this._mousetrap) {
      if (typeof this.getMousetrap === 'function') {
        this._mousetrap = this.getMousetrap();
      } else {
        this._mousetrap = {};
      }
    }
    this._bind();
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    this._unbind();
    this._mousetrap = nextProps.mousetrap;
    if (!this._mousetrap) {
      if (typeof this.getMousetrap === 'function') {
        this._mousetrap = this.getMousetrap();
      } else {
        this._mousetrap = {};
      }
    }
    this._bind();
  },
  componentWillUnmount: function componentWillUnmount() {
    this._unbind();
    _mousetrap3.default.reset();
  }
};
exports.default = MousetrapMixin;
