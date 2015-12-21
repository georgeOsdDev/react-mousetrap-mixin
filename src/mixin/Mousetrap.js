'use strict';

import Mousetrap from 'mousetrap';

let MousetrapMixin = {
  _mousetrap: {},

  _bind(){
    Object.keys(this._mousetrap).forEach((key) => {
      if (typeof this._mousetrap[key] === 'function'){
        Mousetrap.bind(key, this._mousetrap[key]);
      } else if (typeof this._mousetrap[key] === 'object'){
        Mousetrap.bind(key, this._mousetrap[key].callback, this._mousetrap[key].action);
      }
    });
  },

  _unbind(){
    Object.keys(this._mousetrap).forEach((key) => {
      if (typeof this._mousetrap[key] === 'function'){
        Mousetrap.unbind(key);
      } else if (typeof this._mousetrap[key] === 'object'){
        Mousetrap.unbind(key, this._mousetrap[key].action);
      }
      delete this._mousetrap[key];
    });
  },

  addMousetrap(key, callback, action){
    if (typeof callback === 'function'){
      Mousetrap.bind(key, callback, action);
      this._mousetrap[key] = {callback: callback, action: action};
    }
  },

  removeMousetrap(key, action){
    Mousetrap.unbind(key, action);
    delete this._mousetrap[key];
  },

  componentDidMount(){
    this._mousetrap = this.props.mousetrap;
     if (!this._mousetrap){
       if (typeof this.getMousetrap === 'function') {
         this._mousetrap = this.getMousetrap();
       } else {
         this._mousetrap = {};
       }
    }
    this._bind();
  },

  componentWillReceiveProps(nextProps){
    this._unbind();
    this._mousetrap = nextProps.mousetrap;
     if (!_mousetrap){
       if (typeof this.getMousetrap === 'function') {
         this._mousetrap = this.getMousetrap();
       } else {
         this._mousetrap = {};
       }
    }
    this._bind();
  },

  componentWillUnmount(){
    this._unbind();
    Mousetrap.reset();
  }
};
export default MousetrapMixin;

