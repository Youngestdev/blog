---
layout: post
title: "JavaScript Promises: From Zero to Hero"
description: "Learning JavaScript Promises from little or no knowledge to become a Promise Ninja."
date: 
category: JavaScript
author:
  name: "Abdulazeez Adeshina"
  url: "https://twitter.com/kvng_zeez"
  mail: "laisibizness@gmail.com"
  avatar: "https://cdn.auth0.com/blog/guest-authors/abdulazeez.png"
design:
  bg_color: "#1A1A1A"
  image: 
tags:
- javascript
---

**TL;DR:** Callbacks used to be the method for performing tasks like API calls etc. However, Promises which was introduced in the ES6 version of JavaScript, has brought alot of improvement on how we perform synchronous and asynchronous tasks. In this article, through detailed examples, you will learn how to use Promises effectively.

{% include tweet_quote.html quote_text = "Learn JavaScript Promises and become a JavaScript Promise Ninja" %}


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

This is an example of a callback, the empty function is the callback.

```js
setTimeout(function(){
    console.log("I was displayed after 2 seconds !");
}, 2000)
```

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

There are three states in a JavaScript Promise, these are:

+ pending
+ resolved
+ rejected

### The Pending State

This state in a JavaScript Promises tells us the Promise hasn't been resolved or rejected. It isn't binded as a method to the Promise constructor and can only be accessed via the console.

### The Resolved State

A promise is said to be resolved if the action the Promise is working succeeds. It is a method that can be binded to the Promise constructor or passed in as a callback parameter. Here's a simple syntax that showcases the use of `resolve` when binded as a method to the Promise constructor.

```js
Promise.resolve("Hello World").then(function(fulfilled) {
    console.log(fulfilled)
})
```

> Hello world is displayed when the above code is run in the console.

##### Passing Resolve As A Callback Parameter

The example below, will display the same result when run in the console but in this case, the `resolve` state isn't binded directly to the Promise constructor but rather passed as a parameter to the Promise argument, callback.

```js
let sayHello = new Promise((resolve, reject) => {
    // Return hello world when resolved.
    resolve("Hello World");
});
// If resolved, do this.
sayHello.then((fulfilled) => {
    console.log(fulfilled);
});

```

### The Rejected State

This state in a JavaScript Promise throws an Error. If a Promise doesn't work out well, the `reject` state comes to play. The `reject` is enclosed in a `catch` block, it is a traditional custom that all error be enclosed in a `catch` block just as we have the `try {...} catch {...}`. Here's an example of the syntax:

```js
Promise.reject(new Error("You don't use Auth0 ? then I don't know if your app is secured !")).catch((error) => {
   console.log(error.message)
})
```

## Creating JavaScript Promises
