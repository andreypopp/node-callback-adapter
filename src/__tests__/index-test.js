import assert from 'assert';
import Promise from 'bluebird';
import adapt, {adaptFunction} from '../';

describe('node-callback-adapter', function() {

  let add = adaptFunction(function(x, y) {
    return Promise.resolve(x + y);
  });

  class Component {

    @adapt
    add(x, y) {
      return Promise.resolve(x + y);
    }
  }

  it('adapted function allows to be called without a callback', function(done) {
    let result = add(2, 2);
    assert(result instanceof Promise);
    result
      .then(result => {
        assert(result === 4);
        done();
      })
      .catch(done);
  });

  it('adapted function allows to be called with a callback', function(done) {
    let result = add(2, 2, function(err, result) {
      if (err) {
        return done(err);
      }
      assert(result === 4);
      done();
    });
  });

  it('adapted method allows to be called without a callback', function(done) {

    let c = new Component();
    let result = c.add(2, 2);
    assert(result instanceof Promise);
    result
      .then(result => {
        assert(result === 4);
        done();
      })
      .catch(done);
  });
  
  it('adapted method allows to be called with a callback', function(done) {
    let c = new Component();
    let result = c.add(2, 2, function(err, result) {
      if (err) {
        return done(err);
      }
      assert(result === 4);
      done();
    });
  });

});
