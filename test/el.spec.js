import { describe, it } from 'mocha';
import { expect } from 'chai';
import { el } from '../src/el';

describe('when creating an element', () => {

  it('should create a properly structured vdom element', () => {

    const element = el('div', {class: 'test'},
      el('p', {}, 'hello world'),
      el('div', {style: 'color: red'},
        el('button', {}, 'test')
      )
    );

    expect(element).to.deep.equal({
      tag: 'div',
      attributes: {class: 'test'},
      children: [
        {
          tag: 'p',
          attributes: {},
          children: ['hello world']
        },
        {
          tag: 'div',
          attributes: {style: 'color: red'},
          children: [
            {
              tag: 'button',
              attributes: {},
              children: ['test']
            }
          ]
        }
      ]
    });

  });

});