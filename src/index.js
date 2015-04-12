/**
 * @copyright 2015, Andrey Popp <8mayday@gmail.com>
 */

import Promise from 'bluebird';

/**
 * Make a method which returns a promise handle a Node-style callback if it's
 * passed as an extra argument.
 *
 *    class Component {
 *
 *      @nodeCallbackAdapter
 *      async fetchUser(userID) {
 *        ...
 *        return promise
 *      }
 *    }
 *
 *    let c = new Component()
 *    c.fetchUser(42) // returns a promise
 *    c.fetchUser(42, function(err, user) {
 *      ...
 *    })
 *
 */
export default function adapt(target, name, descriptor) {
  let value = adaptFunction(descriptor.value);
  return {...descriptor, value};
}

export function adaptFunction(func) {
  let expectedArgumentsLength = func.length;
  return function adapter(...args) {
    if (args.length === expectedArgumentsLength + 1 &&
        typeof args[args.length - 1] === 'function') {
      let callback = args.pop();
      let called = false;
      function callOnceCallback(err, result) {
        if (called) {
          throw new Error('called already');
        }
        called = true;
        callback(err, result);
      }
      Promise.try(() => func.apply(this, args)).nodeify(callback);
    } else {
      return Promise.try(() => func.apply(this, args))
    }
  };
}
