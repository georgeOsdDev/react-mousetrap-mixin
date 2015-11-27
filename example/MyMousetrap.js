'use strict';

import React from 'react';
import {MousetrapMixin}  from '../index.js';

let MyMousetrap = React.createClass({
  mixins: [MousetrapMixin],

  getInitialState(){
    return {
      color: 'red',
      greenChecked: false
    }
  },
  getMousetrap(){
    return {
      'y e l l o w':() => {
        this.setState({
          color: 'yellow'
        });
      },
      'b l u e':() => {
        this.setState({
          color: 'blue'
        });
      }
    };
  },

  onChange(event){
    this.setState({
      greenChecked: event.target.checked
    }, () => {
      event.target.blur();
      if (this.state.greenChecked){
        this.addMousetrap('g r e e n', () => {
          this.setState({
            color: 'green'
          });
        });
      } else {
        this.removeMousetrap('g r e e n');
      }
    });
  },

  render() {
    let style = {
      backgroundColor: this.state.color
    }
    return (
      <div>
        <div style={style}>
          Type 'yellow' or 'blue'
        </div>
        <input type='checkbox' onChange={this.onChange} checked={this.state.greenChecked} />
        Enable 'green'
      </div>
    );
  }
});

export default MyMousetrap;