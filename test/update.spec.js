import { describe, it, beforeEach } from 'mocha';
import chai from 'chai';
import sinon from 'sinon-chai';
import { expect } from 'chai';
import { stub, match } from 'sinon';
import createDom from 'jsdom-global';
import { update } from '../src/update';
import { el } from '../src/el';

chai.use(sinon);

function view(rootEl) {
  return { children: [rootEl]};
}

describe('update', () => {

  let destroyDom, container;

  before(() => {
    destroyDom = createDom();
  });

  beforeEach(() => {
    container = document.createElement('div');
  });

  describe('when changing attributes', () => {

    let child;

    beforeEach(() => {
      child = document.createElement('div');
      container.appendChild(child);
    })

    it('should add attributes', () => {
      const current = view(el('div', {}));
      const next = view(el('div', {name: 'test'}));

      update(container, current, next);

      expect(child.getAttribute('name')).to.equal('test');
    });

    it('should update attributes', () => {
      child.setAttribute('class', 'hello');

      const current = view(el('div', {class: 'hello'}));
      const next = view(el('div', {class:'world'}));

      update(container, current, next);

      expect(child.getAttribute('class')).to.equal('world');
    });

    it('should remove attributes', () => {
      child.setAttribute('name', 'test');

      const current = view(el('div', {name: 'test'}));
      const next = view(el('div', {}));

      update(container, current, next);

      expect(child.getAttribute('name')).to.not.be.ok;
    });

  });

});