'use strict';
import React from 'react';
import ReactTesuUtils from 'react-addons-test-utils';
import chai from 'chai';
import sinon from 'sinon';
let expect = chai.expect;
import MousetrapMixin from '../../lib/mixin/Mousetrap';

let MyMixin = React.createClass({
  mixins: [MousetrapMixin],

  getInitialState(){
    return {}
  },

  getMousetrap(){
    return {
      'a':this.props.spyA,
      'command+s':this.props.spyB
    };
  },

  add(){
    this.addMousetrap('c', this.props.spyC);
  },

  remove(){
    this.removeMousetrap('a');
  },

  render() {
    return (
      <div>mixin</div>
    );
  }
});


describe('Test of MousetrapMixin', () => {

  let component;

  let spyA,
      spyB,
      spyC;
  beforeEach(() => {
    spyA = sinon.spy();
    spyB = sinon.spy();
    spyC = sinon.spy();
    component = ReactTesuUtils.renderIntoDocument(<MyMixin spyA={spyA} spyB={spyB} spyC={spyC}/>);
  });

  afterEach( () => {
    Mousetrap.reset();
  });

  describe('test of mousetrap defined in getMousetrap', () =>{

    it('should bind mousetrap defined in getMousetrap', function () {
      Mousetrap.trigger('a');
      expect(spyA.callCount).to.equal(1, 'callback should fire once');
      expect(spyA.args[0][1]).to.equal('a', 'second argument should be key combo');
    });

    it('should bind mousetrap defined in getMousetrap', function () {
      Mousetrap.trigger('command+s');
      expect(spyB.callCount).to.equal(1, 'callback should fire once');
      expect(spyB.args[0][1]).to.equal('command+s', 'second argument should be key combo');
    });
  });

  describe('test of addMousetrap', () =>{
    it('should not bind mousetrap before addMousetrap called', function () {
      Mousetrap.trigger('c');
      expect(spyC.callCount).to.equal(0, 'callback should not called');
    });

    it('should bind mousetrap after addMousetrap called', function () {
      component.add();
      Mousetrap.trigger('c');
      expect(spyC.callCount).to.equal(1, 'callback should fire once');
      expect(spyC.args[0][1]).to.equal('c', 'second argument should be key combo');
    });
  });

  describe('test of removeMousetrap', () =>{
    it('should remove mousetrap after removeMousetrap called', function () {
      component.remove();
      Mousetrap.trigger('a');
      expect(spyA.callCount).to.equal(0, 'callback should be called');
    });
  });
});
