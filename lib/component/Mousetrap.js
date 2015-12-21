'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Mousetrap = require('../mixin/Mousetrap');

var _Mousetrap2 = _interopRequireDefault(_Mousetrap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Mousetrap = _react2.default.createClass({
  displayName: 'Mousetrap',

  mixins: [_Mousetrap2.default],

  propTypes: {
    mousetrap: _react2.default.PropTypes.object
  },

  getMousetrap: function getMousetrap() {
    return {
      mousetrap: {}
    };
  },
  render: function render() {
    var element = this.props.children || _react2.default.createElement('span', { key: 'mousetrap-hidden', id: 'mousetrap-hidden', style: { display: 'none' } });
    return element;
  }
});

exports.default = Mousetrap;