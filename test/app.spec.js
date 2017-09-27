import { describe, it, beforeEach } from 'mocha';
import chai from 'chai';
import sinon from 'sinon-chai';
import { expect } from 'chai';
import { stub, match } from 'sinon';
import { app } from '../src/app';

describe('app', () => {
  
  beforeEach(() => {
    global.window = {};
  });

  describe('when requestAnimationFrame is available', () => {
    
    beforeEach(() => {
      window.requestAnimationFrame = stub();
      app({}, {});
    });

    it('should call requestAnimationFrame', () => {
      expect(window.requestAnimationFrame).to.have.been.calledWith(match.func);
    });

  });

  describe('when requestAnimationFrame is not available', () => {
    
    beforeEach(() => {
      window.setTimeout = stub();
      app({}, {});
    });

    it('should call setTimeout instead', () => {
      expect(window.setTimeout).to.have.been.calledWith(match.func, match.number);
    });

  });

});