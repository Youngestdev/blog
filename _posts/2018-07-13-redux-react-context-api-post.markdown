---
layout: post
title: "React Context API—A Replacement for Redux?"
description: "Learn how to migrate from a React application that is based on Redux to the new React Context API."
longdescription: "In this article, We'll be discussing how to move Redux based apps to use the new React Context API. Also, we'll be discussing when we should use Redux or React Context API."
date:
category: Technical Guide, Frontend, React
author:
name: Abdulazeez Abdulazeez Adeshina
url: https://twitter.com/kvng_zeez
avatar:
mail: laisibizness@gmail.com
design:
bg_color: "#1A1A1A"
image: https://cdn.auth0.com/blog/reactjs16/logo.png
tags:
  - react
  - redux
  - react - context
  - context
  - auth0
  - frontend
---

**TL; DR:** React's Context API isn't a new thing in the React's ecosystem. However, React 16.3.0's improvement on the Context API is overwhelming such that it reduces / overthrows the need for Redux / Advanced state management libraries in small scale apps. In this article, we'll be looking at how the new React Context API replaces the need for Redux by building a small app.

{% include tweet_quote.html quote_text = "Learn how to migrate from Redux to the new React Context API in this practical tutorial." %}
## Introduction

### What is Redux ?
[Redux is a JavaScript library used for state management](https://redux.js.org) in popular JavaScript libraries such as **React** and **Angular**.

> State management, in this case, means handling changes that occur upon running / executing a particular action (for example, the click of a button, an async WebSocket message, etc).

### Basic things to know about Redux

- The state of the entire app is stored in a single object within a single store.
- To change the state, we need to dispatch `actions` that describes what needs to happen.
- We cannot change properties of objects or make changes to existing arrays. We should always return a new reference to a new object or new array.

## Building a Simple React App

Since we'll be demonstrating how React's new Context API replaces `Redux`, first, we'll build a React app that uses Redux for state management and then we will refactor this app to remove Redux and use the new Context API. The example app we'll be building is an app that consists of some foods and their origin, we'll be adding a search functionality that enables the user get the list of food using a certain keyword.

### Project Requirements

As this article uses only React and some NPM libraries, we will need nothing else than NodeJS and NPM installed in our machine. If we haven't installed **NodeJS** and **NPM**, check out the [Official installation procedures](https://nodejs.org/en/download/) to install NodeJS and NPM. After installing NodeJS and NPM, we will need to install the `create-react-app` tool. We will use this tool to scaffold a simple React app, which makes the process of starting a new app easier. To install this tool, we run the command :
```bash

npm i -g create-react-app

```

### Building the Redux app

With `create-react-app` installed, we have to move to a directory where we want to put our project and execute the following command:
```bash
$ create-react-app redux-version
```

After a few seconds, `create-react-app` will have finished creating our app. So, after that, we have to move into the new directory(`cd redux-version`) and install two libraries:

```bash
npm i --save redux react-redux
```

> **Note:** Redux is the main library and`react-redux` helps facilitate the interaction between React and Redux. In short, it acts like a proxy.


### Developing the Redux Version

For starters, we will open our project folder in our preferred IDE and then we will create three files into the `src` folder:

- reducers.js
- actions.js
- food.js

#### Creating a Reducer in Redux

The `reducers.js` file that we will create will hold the Redux store. The `store` is the place where the single source of truth of the state in our app will be kept.

Next, we open the newly created file, `reducers.js` and insert the code below:

```js
import Food from './food';

// Initializing state.
const initialState = {
    food: Food,
    searchTerm: '',
};

// Defining the function that allows us manage state in our app.

export default function food(state = initialState, action) {
    // switch between the action type
    switch (action.type) {
        case 'SEARCH_INPUT_CHANGED':
            const {searchTerm} = action.payload;
            return {
                ...state,
                searchTerm: searchTerm,
                food: searchTerm ? Food.filter(
                    food.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 )
                    : Food,
        };
        default:
          return state;
        }
    }

```

> In the code above, we can see that the food function receives two parameters: `state` and `action`. When we run our application, this function will get the `initialState` defined right before it and, when we dispatch instances of an action, this function will get the current state(not the `initialState` anymore).

Remember we created a `food.js` file, we imported it's content into our `reducer.js` file. However, it was empty and we'll be writing some names of food and their origin in an object form enclosed in an array *as per react rules*. Therefore, we open the `food.js` file and insert the code below:

```js
export default [
  {
    name: "Chinese Rice",
    origin: "China",
    continent: "Asia"
  },
  {
    name: "Amala",
    origin: "Nigeria",
    continent: "Africa"
  },
  {
    name: "Banku",
    origin: "Ghana",
    continent: "Africa"
  },
  {
    name: "Pão de Queijo (Brazillian cheese bread)",
    origin: "Brazil",
    continent: "South America"
  },
  {
    name: "Ewa Agoyin",
    origin: "Nigeria",
    continent: "Africa"
  }
];
```

Let's navigate into our `actions.js` file. In our `actions.js` file, we will define the `SEARCH_INPUT_CHANGED` action as pre-defined in the `reducers.js` file to enable the React App return a result after receiving the payload from the search box.

```js

function searchTermChanged(searchTerm) {
    return {
        // define action type
        type: 'SEARCH_INPUT_CHANGED',
        // define action payload
        payload: {searchTerm},
    };
}
export default {
  searchTermChanged,
};

```

The `react-redux` library comes to play in a few seconds. However, the library has a component, `Provider` that makes our Redux Store available to the rest of our app's component.

> Providers make our app's state available to all components, to achieve state's availability, we'll encapsulate the `App` component into a Provider.

### Creating the store & Constructing state's general availability

Next, we create our app's `Store` using all the details written down in the reducers file, we'll replace the pre-existing code in `index.js` with the one below:

```js
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducers from './reducers';
import App from './App';

// Creating the store using the reducers info.
// That's because reducers are the building blocks of a Redux Store.
const store = createStore(reducers);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
```

### Building the main interface

We've been working on the state management with `Redux` and neglected the end output. Well, let's navigate to our `App.js` and replace the code in it with the one below:

{% highlight js %}
{% raw %}
import React from "react";
import { connect } from "react-redux";
import actions from "./actions";
import "./App.css";

// Define our component.
function App({ food, searchTerm, searchTermChanged }) {
  return (
    <div>
      <form>
        <div className="search">
          <input
            type="text"
            name="search"
            placeholder="Search"
            value={searchTerm}
            onChange={e => searchTermChanged(e.target.value)}
          />
        </div>
      </form>
      <table>
        <thead>
          <tr style={{ textAlign: "center" }}>
            <th>Name</th>
            <th>Origin</th>
            <th>Continent</th>
          </tr>
        </thead>
        <tbody>
          {food.map(theFood => (
            <tr key={theFood.name}>
              <td>{theFood.name}</td>
              <td>{theFood.origin}</td>
              <td>{theFood.continent}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
// Export our component.
export default connect(store => store, actions)(App);
{% endraw %}
{% endhighlight %}

> Connect as used in the export statement, is a High Order Component(HOC) that enables the accessibility and availability of different set of properties of a state to children component.

Next, we run our App to view the result, 
```bash
npm run start
```

### Beautifying Output

No doubt the output looks rough, so let's replace the content in the `App.css` with this:

{% highlight css %}
{% raw %}
table {
  width: 100 %;
  border-collapse: collapse;
  margin-top: 15px;
}

th {
  background-color: #eee;
}

input {
  min-width: 300px;
  border: 1px solid #999;
  border-radius: 2px;
  line-height: 25px;
}
{% endraw %}
{% endhighlight %}

### Redux version completed: Refactoring our App

Well, we're actually through with our Redux version. As said earlier, Redux isn't necessarily needed as the size of the app matters talkless of the introduction of the new Context API.

#### So What's A Context API ?

Context provides a way to pass data through the component tree without having to pass props down manually at every level. In React, data is often passed from a parent to its child component as a prop. — Context, React.

##### Is the Context API a new thing ?

No, it isn't. Even Redux uses a component in the Context API: `<Provider />`

#### Using the new React Context API - Things to take note of

Using the new Context API depends on three main steps:

1. Passing the initial state to`React.createContext`. This function then returns an object with a Provider and a Consumer.
2. Using the Provider component at the top of the tree and making it accept a prop called value. This value can be anything!.
3. Using the Consumer component anywhere below the Provider in the component tree to get a subset of the state.

### Rewritting Our App - Moving From Redux To Context API

Sigh, we won't really do alot of work anymore. Migrating from Redux to the new Context API is quite easy.

The first step is removing **every** trace of **Redux** from our app. We'll start by removing the libraries from our app
```bash
npm rm redux react-redux
```

Then, we remove the below codes from `App.js`:

```js
// Remove these lines of code.
import {connect} from 'react-redux';
import actions from './actions';
```

and replace the last line of `App.js`
```js
from
export default connect(store => store, actions)(App); 
to
export default App;
```

With these changes in place, we can rewrite our app with React Context API. So, to convert the previous app from a Redux powered app to using the Context API, we will need a context to store the app's data (this context will replace the Redux Store). Also, we will need a `Context.Provider` component which will have a `state`, `props`, and a normal React component lifecycle.

Therefore, we will create a `providers.js` file in the `src` folder and add the following code to it:

```js
import React from 'react'; 
import Food from './food';

const DEFAULT_STATE = { allFood: Food, searchTerm: '', };
export const ThemeContext = React.createContext(DEFAULT_STATE);
export default class Provider extends React.Component { state = DEFAULT_STATE;
searchTermChanged = searchTerm => { this.setState({searchTerm}); };
render() { 
    return ( 
        <ThemeContext.Provider value={{ ...this.state, searchTermChanged: this.searchTermChanged, }} > {this.props.children} </ThemeContext.Provider> ); } }
```

The Provider class is responsible for encapsulating other components inside the `ThemeContext.Provider` so these components can have access to our app's state and to the `searchTermChanged` function that provides a way to change this state.

To consume these values later in the component tree, we will need to initiate a `ThemeContext.Consumer` component. This component will need a render function that will receive the above value props as arguments to use at will. Next, we create another file, `consumer.js` in the `src` directory and write the following code into it:

```js
import React from 'react';
import {ThemeContext} from './provider';

export default class Consumer extends React.Component {
  render() {
    const {children} = this.props;

    return (
      <ThemeContext.Consumer>
        {({allFood, searchTerm, searchTermChanged}) => {
          const food = searchTerm
            ? allFood.filter(
              food =>
                food.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
            )
            : allFood;

          return React.Children.map(children, child =>
            React.cloneElement(child, {
              food,
              searchTerm,
              searchTermChanged,
            })
          );
        }}
      </ThemeContext.Consumer>
    );
  }
}
```

Now, to finalise the migration, we will open our `index.js` file, and inside the `render()` function, wrap the `App` component with the Consumer component. Also, wrap the Consumer inside the `Provider` component. Exactly as shown here:

```js
import React from 'react';
import ReactDOM from 'react-dom';
import Provider from './provider';
import Consumer from './consumer';
import App from './App';

ReactDOM.render(
  <Provider>
    <Consumer>
      <App />
    </Consumer>
  </Provider>,
  document.getElementById('root')
);
```

### Wrapping up

We have successfully refactored our React App which was formerly powered by `Redux` to use React's own **Context API**.

## In summary

Redux is an **advanced** state management library that should be used when building large scale react apps. That is as a result of fast caching and easing the loading actions conducted by React when loading new changes effected by the state. The Context API on the other hand, should be used in small scale react apps where byte - sized changes are made. Using the Context API, we do not have to write a lot of code such as `reducers`, `actions` etc to work out the logic exhibited by state changes. 
