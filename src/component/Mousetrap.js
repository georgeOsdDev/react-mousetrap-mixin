'use strict';

import React from 'react';
import MousetrapMixin from '../mixin/Mousetrap';

let Mousetrap = React.createClass({
  mixins: [MousetrapMixin],

  propTypes: {
    mousetrap: React.PropTypes.object
  },

  getMousetrap() {
    return {
      mousetrap: {}
    }
  },

  render() {
    let element = this.props.children || (<span key='mousetrap-hidden' id='mousetrap-hidden' style={{ display:'none' }} />);
    return element;
  }
});

export default Mousetrap;

