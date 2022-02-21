# **Redux library**  

## **Redux**  

Is a library for managing state in a predictable way in Javascript applications

---

## **React-Redux** 

Is the official package to bind the React and Redux libraries

---

## **Redux three main concepts:**

### **Store**

A redux store holds the state of your applications

### **Action**

A redux action describes how you want to modify the state of your store

### **Reducer**

A reducer is what ties the store and actions together, by actually carrying out the state transition depending on the action

## **Redux three main Principles:**

### **First Principle**

**"The state of your whole application is stored in an object tree within a single store"**

Maintain our application state in a single object which would be managed by the Redux store

<div style="background-color: black; border-radius: 10px; padding: 10px;">

```js
// Cake shop example
// Let's assume we are tracking the number of cakes on a shelf

const state = {
 numberOfCakes: 10
}
```

</div>

---

### **Second Principle**

**"The only way to change the state is to emit an action,an object describing what happened"**

To update the state of your app, you need to let Redux know about that with an action that

Not allowed to directly update the state object

<div style="background-color: black; border-radius: 10px; padding: 10px;">

```js
// Cake shop example
// Let the shopkeeper know about our action - BUY_CAKE

const action = {
 type: "BUY_CAKE"
}
```

</div>

---

### **Third Principle**

**"To specify how the state tree is transformed by actions, you write pure reducers"**

Reducer - (previousState,action) => newState

Not allowed to directly update the state object

<div style="background-color: black; border-radius: 10px; padding: 10px;">

```js
// Cake shop example
// Reducer is the shopkeeper

const reducer = (state, action) => {
  switch(action.type){
    case BUY_CAKE: return {
      numOfCakes: state.numOfCakes -  1
    }
  }
}
```

</div>

---

### Actions

- Actions are the only way your application can interact with the store
- Actions carry some information from your app to the redux store 
- Actions are plain JavaScript objects
- Must have a 'type' property that indicates the type of action being performed
- The 'type' property is typically defined as string constants

<div style="background-color: black; border-radius: 10px; padding: 10px;">

```js
// Cake shop example
// You can create a function which will return the action

const buyCake = () => {
    return {
      type: 'BUY_CAKE'
    }
}
```

</div>

---

### Reducers

- Specify how the app's state changes in response to actions sent to the store
- Function that accepts state and action as arguments, and returns the next state of the applications
- It can be viewed as: (prevState,action) => newState

<div style="background-color: black; border-radius: 10px; padding: 10px;">

```js
// Cake shop example
// You can create a function which will return the action

const buyCake = () => {
    return {
      type: 'BUY_CAKE'
    }
}

// initial state

const initialState = {
  numOfCakes: 10
}

// reducers

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'BUY_CAKE': return {
      ...state,
      numOfCakes: state.numOfCakes - 1
    }
    default: return state
  }
}

```

</div>

---

---

### Store

- There may only be one store for the entire application
- Responsibilities:
  - Holds application state
  - Allows access to the state via **getState()**
  - Allows state to be updated via **dispatch(action)**
  - Allows for listeners registration via **subscribe(listener)**
  - Handles the un registering of listeners via the function returned by **subscribe(listener)**

<div style="background-color: black; border-radius: 10px; padding: 10px;">

```js
// Cake shop example
// You can create a function which will return the action
import redux from 'redux';

// Store the create store method in a constant

const createStore = redux.createStore

// action creator

const buyCake = () => {

    // returns the action of type BUY_CAKE

    return {
      type: 'BUY_CAKE'
    }
}

// initial state

const initialState = {
  numOfCakes: 10
}

// reducers

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'BUY_CAKE': return {
      ...state,
      numOfCakes: state.numOfCakes - 1
    }
    default: return state
  }
}
// create the store

const store = createStore(reducer)

// create the listener function that will have access to the updated state

const listener = () => console.log('Updated state',store.getState())

// subscribe to the store using the listener function
// store the return value of subscribe which will be unsubscribe

const unsubscribe = store.subscribe(listener);

// pass the action creator to the dispatch method of the store to update the state

store.dispatch(buyCake());

// call the unsubscribe method
unsubscribe();

```

</div>

---

### Multiple Reducers

<div style="background-color: black; border-radius: 10px; padding: 10px;">

```js
// Cake shop example with two Shopkeepers one who cares about cakes and the other about icecreams

// You can create a function which will return the action
import redux from 'redux';

// Store the create store method in a constant

const createStore = redux.createStore

// get the combineReducers function from redux

const combineReducers = redux.combineReducers

// action creator (shopkeeper 1)

const buyCake = () => {

    // returns the action of type BUY_CAKE

    return {
      type: 'BUY_CAKE'
    }
}

// action creator (shopkeeper 2)

const buyIceCream = () => {

  // returns the action of type BUY_ICECREAM

  return {
    type: 'BUY_ICECREAM'
  }
}

// initial cake state

const initialCakeState = {
  numOfCakes: 10,
}

// initial icecream state

const initialIceCreamState = {
  numOfIceCreams: 20
}

// cake reducer

const cakeReducer = (state = initialCakeState, action) => {
  switch(action.type) {
    case 'BUY_CAKE': return {
      ...state,
      numOfCakes: state.numOfCakes - 1
    }
    default: return state
  }
}

// icecream reducer

const iceCreamReducer = (state = initialIceCreamState, action) => {
  switch(action.type) {
    case 'BUY_ICECREAM': return {
      ...state,
      numOfIceCreams: state.numOfIceCreams - 1
    }
    default: return state
  }
}

// create a root reducer which will hold the combination of the reducers

const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer
})

// create the store

const store = createStore(rootReducer);

// create the listener function that will have access to the updated state

const listener = () => console.log('Updated state',store.getState())

// subscribe to the store using the listener function
// store the return value of subscribe which will be unsubscribe

const unsubscribe = store.subscribe(listener);

// pass the action creator #1 to the dispatch method of the store to update the state (simulating that the shopkeeper who cares about cakes receives an order to buy one cake)

store.dispatch(buyCake());

// pass the action creator #2 to the dispatch method of the store to update the state (simulating that shopkeeper who cares about icecreams receives an order to buy one icecream)

store.dispatch(buyIceCream());

// call the unsubscribe method
unsubscribe();

```

</div>

---

### Middleware

<div style="background-color: black; border-radius: 10px; padding: 10px;">

```js

// Cake shop example with two Shopkeepers one who cares about cakes and the other about icecreams

// import redux
import redux from 'redux';

// import reduxLogger
import reduxLogger = 'redux-logger';

// Store the create store method in a constant

const createStore = redux.createStore;

// get the combineReducers function from redux

const combineReducers = redux.combineReducers;

// get the apply middleware function from redux

const applyMiddleware = redux.applyMiddleware;

// create the logger middleware
const logger = reduxLogger.createLogger();

// action creator (shopkeeper 1)

const buyCake = () => {

    // returns the action of type BUY_CAKE

    return {
        type: 'BUY_CAKE'
    }
}

// action creator (shopkeeper 2)

const buyIceCream = () => {

    // returns the action of type BUY_ICECREAM

    return {
        type: 'BUY_ICECREAM'
    }
}

// initial cake state

const initialCakeState = {
    numOfCakes: 10,
}

// initial icecream state

const initialIceCreamState = {
    numOfIceCreams: 20
}

// cake reducer

const cakeReducer = (state = initialCakeState, action) => {
    switch (action.type) {
        case 'BUY_CAKE':
            return {
                ...state,
                numOfCakes: state.numOfCakes - 1
            }
        default:
            return state
    }
}

// icecream reducer

const iceCreamReducer = (state = initialIceCreamState, action) => {
    switch (action.type) {
        case 'BUY_ICECREAM':
            return {
                ...state,
                numOfIceCreams: state.numOfIceCreams - 1
            }
        default:
            return state
    }
}

// create a root reducer which will hold the combination of the reducers

const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCream: iceCreamReducer
})

// create the store and pass a second argument with applymiddleware and the logger

const store = createStore(rootReducer, applyMiddleware(logger));

// create the listener function that will have access to the updated state

const listener = () => console.log('Updated state', store.getState())

// subscribe to the store using the listener function
// store the return value of subscribe which will be unsubscribe

const unsubscribe = store.subscribe(listener);

// pass the action creator #1 to the dispatch method of the store to update the state (simulating that the shopkeeper who cares about cakes receives an order to buy one cake)

store.dispatch(buyCake());

// pass the action creator #2 to the dispatch method of the store to update the state (simulating that shopkeeper who cares about icecreams receives an order to buy one icecream)

store.dispatch(buyIceCream());

// call the unsubscribe method
unsubscribe();

```

</div>

---

### Async Actions

<div style="background-color: black; border-radius: 10px; padding: 10px;">

```js

//import redux axios and redux thunk
import redux from 'redux';
import axios from 'axios';
import thunkMiddleware from 'redux-thunk'.default;

// store the function to create a store 
const createStore = redux.createStore;

// store the function to apply a middleware to the store
const applyMiddleware = redux.applyMiddleware;

const initialState = {
  loading: false,
  users: [],
  error: ''
}

// action constants
const FETCH_USERS_REQUESTS = 'FETCH_USERS_REQUESTS';
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

//action creator for when you start a users request

const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUESTS
  }
};

//action creator for when you get a successful request

const fetchUsersSuccess = users => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: users
  }
};

// action creator for when you get an unsuccessful request

const fetchUsersFailure = error => {
  return {
    type: FETCH_USERS_FAILURE,
    payload: error
  }
}

// reducer function

const reducer = (state = initialState,action) => {
  switch(action.type){
    // sets the loading to true since the request is just sent
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true
      }
    // sets the users to the result we got from the request and sets loading to false since the wait is over and the error to an empty string since there is no error
    case FETCH_USERS_SUCCESS: return {
      loading: false,
      users: action.payload,
      error: ''
    }
    // sets the users to an empty string  and sets loading to false since the wait is over and the error to the error we got when making the request
    case FETCH_USERS_FAILURE: return {
      loading:false,
      users:[]
      error: action.payload
    }
  }
}

// async action creator
const fetchUsers = () => {
  return async (dispatch) => {
    try{
      dispatch(fetchUsersRequest);
      const response = await axios.get('https://jsonplaceholder.typicode.com/users')
      dispatch(fetchUsersSuccess(response.data.map(user => user.id)));
    }catch(error){
      dispatch(fetchUsersFailure(error.message))
    }
    
  }
}

// create the store and pass the reducer function

const store = createStore(reducer, applyMiddleware(thunkMiddleware))
const unsubscribe = store.subscribe(()=> console.log(store.getState()));
store.dispatch(fetchUsers());

unsubscribe();



```

</div>

---

<style>
  body{
    background-color: #fff
  }
  h1{
    color: #748cc9;
  }
  h2{
    color: #748cfa
  }
  h3{
    color: #748cab
  }
  p{
    color: #0d1321;
  }
</style>
