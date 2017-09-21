import { describe, it } from 'mocha';
import { expect } from 'chai';
import { object, func, string } from '../src/util';

describe('util', () => {

  describe('object', () => {

    it('should return true for objects', () => {
      expect(object({})).to.be.true;
    });

    it('should return false for non-objects', () => {
      expect(object('')).to.be.false;
    });

  });

  describe('func', () => {

    it('should return true for functions', () => {
      expect(func(()=>{})).to.be.true;
    });

    it('should return false for non-functions', () => {
      expect(func({})).to.be.false;
    });

  });

  describe('string', () => {

    it('should return true for strings', () => {
      expect(string('')).to.be.true;
    });

    it('should return false for non-strings', () => {
      expect(string(0)).to.be.false;
    });

  });

});