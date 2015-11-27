'use strict';
import React from 'react';
import ReactDom from 'react-dom';
import ReactTesuUtils from 'react-addons-test-utils';
import Mousetrap from 'mousetrap';
import chai from 'chai';
import sinon from 'sinon';
let expect = chai.expect;
import MousetrapComponent from '../../lib/component/Mousetrap';


describe('Test of Mousetrap', () => {

  let component;

  beforeEach(() => {
  });

  describe('test of properties', () =>{
    it('should have default properties', function () {
      component = ReactTesuUtils.renderIntoDocument(<MousetrapComponent />);
      expect(component.props.mousetrap).to.be.empty;
    });
  });

  describe('test of rendered element', () =>{
    it('should render hidden element when it has no children', function () {
      component = ReactTesuUtils.renderIntoDocument(<MousetrapComponent />);
      const span = ReactTesuUtils.findRenderedDOMComponentWithTag(component, 'span');
      expect(ReactDom.findDOMNode(span).textContent).to.be.eql('');
    });

    it('should render children when it has children', function () {
      component = ReactTesuUtils.renderIntoDocument(<MousetrapComponent ><span>children</span></MousetrapComponent>);
      const span = ReactTesuUtils.findRenderedDOMComponentWithTag(component, 'span');
      expect(ReactDom.findDOMNode(span).textContent).to.be.eql('children');
    });
  });

  describe('test of mousetrap props without action', () =>{
    let singleSpy = sinon.spy();
    let multiKeySpy = sinon.spy();
    let sequenceSpy = sinon.spy();
    before( () => {
      let mousetrap = {
        'z': singleSpy,
        'command+s': multiKeySpy,
        'up up down down left right left right b a enter': sequenceSpy
      };
      component = ReactTesuUtils.renderIntoDocument(<MousetrapComponent mousetrap={mousetrap}/>);
    });

    it('should bind single key mousetrap from props', function () {
      Mousetrap.trigger('z');
      expect(singleSpy.callCount).to.equal(1, 'callback should fire once');
      expect(singleSpy.args[0][1]).to.equal('z', 'second argument should be key combo');
    });

    it('should bind multi keys mousetrap from props', function () {
      Mousetrap.trigger('command+s');
      expect(multiKeySpy.callCount).to.equal(1, 'callback should fire once');
      expect(multiKeySpy.args[0][1]).to.equal('command+s', 'second argument should be key combo');
    });

    it('should bind sequencial keys mousetrap from props', function () {
      Mousetrap.trigger('up up down down left right left right b a enter');
      expect(sequenceSpy.callCount).to.equal(1, 'callback should fire once');
      expect(sequenceSpy.args[0][1]).to.equal('up up down down left right left right b a enter', 'second argument should be key combo');
    });

    after( () => {
      Mousetrap.reset();
    });
  });

  describe('test of mousetrap props with action', () =>{
    let spy1 = sinon.spy();
    let spy2 = sinon.spy();
    let spy3 = sinon.spy();
    before( () => {
      let mousetrap = {
        'a': {
          callback: spy1,
          action: 'keyup'
        },
        'b': {
          callback: spy2,
          action: 'keydown'
        },
        c: spy3
      };
      component = ReactTesuUtils.renderIntoDocument(<MousetrapComponent mousetrap={mousetrap}/>);
    });

    it('should bind key and callback with action', function () {
      Mousetrap.trigger('a', 'keydown');
      expect(spy1.callCount).to.equal(0, 'callback should not called');
    });

    it('should bind key and callback with action', function () {
      Mousetrap.trigger('b', 'keydown');
      expect(spy2.callCount).to.equal(1, 'callback should fire once');
    });

    it('should bind key and callback with action', function () {
      Mousetrap.trigger('c', 'keydown');
      expect(spy3.callCount).to.equal(0, 'callback should not called');
    });

    after( () => {
      Mousetrap.reset();
    });
  });

});
