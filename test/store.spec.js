import { describe, it, beforeEach } from 'mocha';
import chai from 'chai';
import sinon from 'sinon-chai';
import { expect } from 'chai';
import { stub, match } from 'sinon';
import { createStore } from '../src/store';

chai.use(sinon);

describe('store', () => {

  let store, value, reducers, update;

  beforeEach(() => {
    update = stub();
    value = {x: 10};
    reducers = [
      stub().withArgs({x: 10}, 'inc', 1).returns({x: 11}),
      stub().returnsArg(0)
    ];
    store = createStore(value, reducers, update);
  });

  describe('when dispatching an event', () => {

    beforeEach(() => {
      store.dispatch('inc', 1);
    });

    it('should reduce', () => {
      expect(reducers[0]).to.have.been.calledWith(
        match({x: 10}),
        'inc',
        1
      );

      expect(reducers[1]).to.have.been.calledWith(
        match({x: 11}),
        'inc',
        1
      );

      expect(store.value).to.include({x: 11});
    });
    
    it('should update', () => {
      expect(update).to.have.been.calledWith(store);
    });

  });

  describe('when creating a store', () => {

    it('should contain properties', () => {
      expect(store).to.have.keys(
        'value',
        'update',
        'dispatch',
        'http'
      );
    });

  });

});