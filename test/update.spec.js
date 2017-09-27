import { describe, it, beforeEach, before, after } from 'mocha';
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

const div = (attrs, ...children) => el('div', attrs, ...children);
const p = (attrs, ...children) => el('p', attrs, ...children);

describe('update', () => {

  let destroyDom, container, node;

  before(() => {
    destroyDom = createDom();
  });

  after(() => {
    destroyDom();
  });
  
  beforeEach(() => {
    container = document.createElement('div');
    node = document.createElement('div');
    container.appendChild(node);
  });

  describe('when changing attributes', () => {

    it('should add attributes', () => {
      const current = view(div({}));
      const next = view(div({name: 'test'}));

      update(container, current, next);

      expect(node.getAttribute('name')).to.equal('test');
    });

    it('should update attributes', () => {
      node.setAttribute('class', 'hello');

      const current = view(div({class: 'hello'}));
      const next = view(el('div', {class:'world'}));

      update(container, current, next);

      expect(node.getAttribute('class')).to.equal('world');
    });

    it('should remove attributes', () => {
      node.setAttribute('name', 'test');

      const current = view(div({name: 'test'}));
      const next = view(div({}));

      update(container, current, next);

      expect(node.getAttribute('name')).to.not.be.ok;
    });

  });

  describe('when updating child nodes', () => {

    it('should add child node', () => {
      const current = view(div({}));
      const next = view(div({}, p({})));

      update(container, current, next);

      expect(node.children[0].tagName.toLowerCase()).to.equal('p');
    });

    it('should update a child node', () => {
      node.appendChild(document.createElement('div'));

      const current = view(div({}, div({})));
      const next = view(div({}, p({})));

      update(container, current, next);

      expect(node.children[0].tagName.toLowerCase()).to.equal('p');
    });

    it('should remove a child node', () => {
      node.appendChild(document.createElement('div'));

      const current = view(div({}, div({})));
      const next = view(div({}));

      update(container, current, next);

      expect(node.children[0]).to.not.be.ok;
    });

  });

  describe('when updating child text', () => {
  
    it('should add text', () => {
      const current = view(div({}));
      const next = view(div({}, 'hello world'));

      update(container, current, next);

      expect(node.textContent).to.equal('hello world');
    });

    it('should update text', () => {
      node.appendChild(document.createTextNode('hello'));

      const current = view(div({}, 'hello'));
      const next = view(div({}, 'world'));

      update(container, current, next);

      expect(node.textContent).to.equal('world');
    });

    it('should remove text', () => {
      node.appendChild(document.createTextNode('hello world'));

      const current = view(div({}, 'hello world'));
      const next = view(div({}));

      update(container, current, next);

      expect(node.textContent).to.not.be.ok;
    });

  });

});