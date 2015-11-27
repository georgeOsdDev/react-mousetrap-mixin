'use strict';

import React from 'react';
import ReactDom from 'react-dom';
import Mousetrap  from '../index.js';
import MyMousetrap  from './MyMousetrap';

class App1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let mousetrap = {
      'up up down down left right left right b a enter'() {
        alert('KONAMI');
      },
      'up x down b l y r a'(){
        alert('カカロットォ');
      },
      'esc': {
        callback() {console.log('esc');},
        action: 'keyup'
      }
    }
    return (
      <div>
        <h3>Type konami command</h3>
        <pre>
          ↑ ↑ ↓ ↓ ← → ← → b a enter
        </pre>
        <Mousetrap mousetrap={mousetrap} />
      </div>
    );
  }
};

class App2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <MyMousetrap />
      </div>
    );
  }
};

window.componentExample = () => {
  ReactDom.render(
    <App1 />,
    document.getElementById('out')
  );
}

window.mixinExample = () => {
  ReactDom.render(
    <App2 />,
    document.getElementById('out')
  );
}


