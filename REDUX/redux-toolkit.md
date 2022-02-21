# Redux toolkit

First you need to create a directory called redux
where you will create the store.The store contains
the reducers which in part contain the actions.

A slice contain the state the actions and the reducers
using a function createSlice from the reduxjs/toolkit
Then you need to export the actions and the reducer
like this
and example of a Slice would be:

```js

    import {createSlice} from '@reduxjs/toolkit';

    export const counterSlice = createSlice({
    name:'counter',
    initialState: {
    count: 0
    },
    reducers: {
    //actions
    increment: (state) => {
    state.count += 1;
    },
    decrement: (state) => {
    state.count -= 1;
    },
    incrementByAmount: (state, actions) => {
        state.count += action.payload;
        }
    }
    });


export const { action1, action2 } = nameSlice.actions;
export const selectCounter = (state) => state.counter.count;
export default nameSlice.reducer;

```

In the store.js you will import the reducer meaning the slice.reducer
and add it to the store. example code would be

```js
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counter';

    export default configureStore({
        reducer: {
            //name and assign the imported reducer
            counter: counterReducer
        }
    });

```

You need to import Provider from react-redux library
in the index.js of the project and build the Provider
component surrounding the App component, so that all
the components have access to the state. Provider needs
a prop called store which you will pass to the store you
build with all the reducers.

```js
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './redux/store';

    ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
    );

```

In the App.js file instead of using useState hook you need to
use the 'useSelector' hook passing a function to it. Also the
buttons need to call the actions we created in the reducer.An
Example would be:

```js

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment } from './redux/counter';

    export default function App() {
        // were counter is the reducer we named in the store
        const { count } = useSelector((state)=> state.counter);
        // we use the dispatch to call the actions
        const dispatch = useDispatch();
        return(
            <div className="App">
            <h1> The count is: {count}</h1>
            <button onClick={()=>dispatch(increment())}>Increment</button>
            <button onClick={()=>dispatch(decrement())}>Decrement</button>
            <button onClick={()=>dispatch(incrementByAmount({payload:33}))>Increment by 33</button>

            </div>
        );
    }

```

USING API CALLS

we need to create a slice and add extraReducers key with the async requests

```js

import { creteSlice, createAsyncThunk } from '@reduxjs/toolkit';
// CREATE THE THUNK
export const getPosts = createAsyncThunk{
'posts/getPosts',
async () => {
// api call
return fetch('https://jsonplaceholder.typicode.com/posts').then(res => res.json();
}
};

    const postsSlice = creteSlice({
        name: 'posts',
        initialState: {
            list: [],
            status: null
        },
        extraReducers: {
            [getPosts.pending]: (state, action) => {
                state.status = 'loading';
            },
            [getPosts.fulfilled]: (state, {payload}) => {
                state.list = payload;
                state.status = 'success';
            },
            [getPosts.rejected]: (state, action) => {
                state.status = 'failed';
            }
        }
    });

    export default postsSlice.reducer;

```

Then you need to import the reducer to the store.
Then CREATE a component that will handle in this
example the posts

```js

import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {getPosts} from '..posts/postSlice';

    const Posts = () => {
        const dispatch = useDispatch();
        // you need to use the useEffect hook with the [dispatch]
        so that only when the dispatch changes it will send the
        api request, usually makes it run once
        useEffect(() => {
            dispatch(getPosts());
        },[dispatch])

        const { list } = useSelector((state)=> state.list);

        return(
            <div>
                {list.map(post => <div>
                    <h1>{post.title}</h1>
                    <p>{post.body}</p>
                </div>)}
            </div>);
    }

```

## USING RTK QUERY

You can import it as so:

```js

import {createApi} from @reduxjs/toolkit/query 
import {createApi} from @reduxjs/toolkit/query/react

```

## RTK Query includes these APIs:

- **createApi()**: The core of RTK Query's functionality. It allows you to define a set of endpoints describe how to retrieve data from a series of endpoints, including configuration of how to fetch and transform that data. In most cases, you should use this once per app, with "one API slice per base URL" as a rule of thumb.

- **fetchBaseQuery()**: A small wrapper around fetch that aims to simplify requests. Intended as the recommended baseQuery to be used in createApi for the majority of users.

- **< ApiProvider />**: Can be used as a Provider if you do not already have a Redux store.

- **setupListeners()**: A utility used to enable refetchOnMount and refetchOnReconnect behaviors.

## BASIC USAGE

```js

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Pokemon } from './types'

    // Define a service using a base URL and expected endpoints
    export const pokemonApi = createApi({
    reducerPath: 'pokemonApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
    endpoints: (builder) => ({
        getPokemonByName: builder.query<Pokemon, string>({
        query: (name) => `pokemon/${name}`,
        }),
    }),
    })

    // Export hooks for usage in functional components, which are
    // auto-generated based on the defined endpoints
    export const { useGetPokemonByNameQuery } = pokemonApi

```

## CONFIGURE THE STORE

```js 

import { configureStore } from '@reduxjs/toolkit'
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query'
import { pokemonApi } from './services/pokemon'

    export const store = configureStore({
    reducer: {
        // Add the generated reducer as a specific top-level slice
        [pokemonApi.reducerPath]: pokemonApi.reducer,
    },
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(pokemonApi.middleware),
    })

    // optional, but required for refetchOnFocus/refetchOnReconnect behaviors
    // see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
    setupListeners(store.dispatch)

```

## USE HOOKS IN components

```js

import \* as React from 'react'
import { useGetPokemonByNameQuery } from './services/pokemon'

    export default function App() {
    // Using a query hook automatically fetches data and returns query values
    const { data, error, isLoading } = useGetPokemonByNameQuery('bulbasaur')

    // Individual hooks are also accessible under the generated endpoints:
    // const { data, error, isLoading } = pokemonApi.endpoints.getPokemonByName.useQuery('bulbasaur')

    // render UI based on data and loading state

```
