## What are JavaScript Promises

A JavaScript promise, is a constructor that takes in one argument, a **callback** with two parameters, `resolve` and `reject`. The JavaScript promise, executes a task asynchronously or synchronously with the callback, then calls the `resolve` parameter if the task is executed successfully or the `reject` parameter if there's an error.

> A JavaScript Promise acts just like a real life Promise.

The JavaScript Promise syntax looks thus as thus:

```js

new Promise(/* executor*/ function (resolve, reject) { ... } );

```

## JavaScript Promises Alternatives

Before the existence of JavaScript promises, callbacks existed. 

### What Are Callbacks ?

Callbacks are synchronous or asynchr functions that executes before or after a particular task is carried out. Callbacks are mostly embedded into events e.g `setTimeout(function(), time))`, `addEventListener(event, callback)`.

### Callbacks Vs JavaScript Promise

Callbacks are ideal only for certain events and should be used only in small functions / events while Promises, can take on large events and help chain certain events till each is executed.

### Callback Hell

Callback hell, is a situation whereby a lot of callbacks are chained or attached to a single function, thereby making the function complex than it should. Here's an example :
```js
function fastTimer(stop) {
    setTimeout(function(){
        stop();
    }, 2000)
}

function slowTimer(stop) {
    setTimeout(function() {
        stop();
    }, 5000)
}

// Callback Hell !!
function runBothTimers (callback) {
  fastTimer((err, data) => {
    if (err) return callback(err)
    console.log(data)   // results of a
  
    slowTimer((err, data) => {
      if (err) return callback(err)
      console.log(data) // results of b
  
    // continually running callbacks / codes here leads to a callback hell.
    })
  })
}

```

Callback hells, overload the VM and crashes it hereby resulting to an error from the runtime engine.

## States In A JavaScript Promise
