import { describe, it, beforeEach } from 'mocha';
import chai from 'chai';
import sinon from 'sinon-chai';
import { expect } from 'chai';
import { stub, match } from 'sinon';
import { get, post, put , del } from '../src/http';

chai.use(sinon);

function XMLHttpRequest() {
  this.open = stub();
  this.setRequestHeader = stub();
  this.send = stub();
  this.succeed = response => {
    this.readyState = XMLHttpRequest.DONE;
    this.status = 200;
    this.responseText = response
    this.onreadystatechange();
  };
  this.fail = () => {
    this.readyState = XMLHttpRequest.DONE;
    this.status = 404;
    this.onreadystatechange();
  };
}

XMLHttpRequest.DONE = 4;
global.XMLHttpRequest = XMLHttpRequest;

describe('http', () => {

  const tests = [
    {
      func: get,
      method: 'GET',
      url: '/test?hello=world&good=bye',
      params: '{}'
    },
    {
      func: post,
      method: 'POST',
      url: '/test',
      params: '{"hello":"world","good":"bye"}'
    },
    {
      func: put,
      method: 'PUT',
      url: '/test',
      params: '{"hello":"world","good":"bye"}'
    },
    {
      func: del,
      method: 'DELETE',
      url: '/test',
      params: '{"hello":"world","good":"bye"}'
    }
  ];

  let request, cb;

  for(const { func, method, url, params } of tests) {

    describe(func.name, () => {

      beforeEach(() => {
        cb = stub();
        request = func('/test', { hello: 'world', good: 'bye'}, cb);
      });

      it(`should create correct ${method} request`, () => {
        expect(request.open).to.have.been.calledWith(method, url, true);
        expect(request.setRequestHeader).to.have.been.calledWith('Content-Type', 'application/json');
        expect(request.send).to.have.been.calledWith(params);
      });

      it('should call the callback with the result on success', () => {
        request.succeed('{"it": "succeeded"}');
        expect(cb).to.have.been.calledWith(null, match({ it: 'succeeded' }));
      });

      it('should call the callback with an error on failure', () => {
        request.fail();
        expect(cb).to.have.been.calledWith(404, null);
      });

      it('should call the callback with an error on unparsable response', () => {
        request.succeed('this will fail');
        expect(cb).to.have.been.calledWith(match.instanceOf(Error), null);
      })

    });
    
  }

});