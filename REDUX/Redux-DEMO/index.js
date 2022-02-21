// Cake shop example with two Shopkeepers one who cares about cakes and the other about icecreams

// require redux
const redux = require('redux');

// require reduxLogger
const reduxLogger = require('redux-logger');

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