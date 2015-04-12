# node callback adapter decorator

This is a function/method decorator which is when applied to a function which
returns a promise makes it to handle optionally passed Node-style callback as
last argument.

As decorators are a part of future ES7 standard they can only be used with
transpilers such as [Babel](http://babeljs.io).

Installation:

    % npm install node-callback-adapter

Example usage as a method decorator:

    import adapt from 'node-callback-adapter'

    class Component {

      @adapt
      add(x, y) {
        return Promise.resolve(x + y)
      }
    }

    let component = new Component()

    // call without callback and get a promise back
    component.add(2, 2).then(four => console.log(four))

    // call with a callback
    component.add(2, 2, function(err, four) {
      console.log(four)
    })

Example usage as a function decorator:

    import {adaptFunction} from 'node-callback-adapter'

    let add = adaptFunction(function add(x, y) {
      return Promise.resolve(x + y)
    })

    // call without callback and get a promise back
    add(2, 2).then(four => console.log(four))

    // call with a callback
    add(2, 2, function(err, four) {
      console.log(four)
    })
