//import redux axios and redux thunk
const redux = require('redux');
const axios = require('axios');
const thunkMiddleware = require('redux-thunk').default;
const reduxLogger = require('redux-logger');

// store the function to create a store 
const createStore = redux.createStore;

// store the function to apply a middleware to the store
const applyMiddleware = redux.applyMiddleware;

// create the logger middleware
const logger = reduxLogger.createLogger();

// sets the initialState 

const initialUsersState = {
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

const reducer = (state = initialUsersState, action) => {
    switch (action.type) {
        // sets the loading to true since the request is just sent
        case FETCH_USERS_REQUESTS:
            return {
                ...state,
                loading: true,

            }
            // sets the users to the result we got from the request and sets loading to false since the wait is over and the error to an empty string since there is no error
        case FETCH_USERS_SUCCESS:
            return {
                loading: false,
                users: action.payload,
                error: ''
            }
            // sets the users to an empty string  and sets loading to false since the wait is over and the error to the error we got when making the request
        case FETCH_USERS_FAILURE:
            return {
                loading: false,
                users: [],
                error: action.payload
            }
    }
}

// async action creator
const fetchUsers = () => {
    return async(dispatch) => {
        dispatch(fetchUsersRequest());
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/users')
            dispatch(fetchUsersSuccess(response.data.map(user => user.id)));
        } catch (error) {
            dispatch(fetchUsersFailure(error.message))
        }

    }
}

// create the store and pass the reducer function

const store = createStore(reducer, applyMiddleware(thunkMiddleware, logger))
    // const unsubscribe = store.subscribe(() => { console.log(store.getState()) });
store.subscribe(() => {});
store.dispatch(fetchUsers());