/**
 * Redux store
 */
import { createStore, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootRD from './reducers/rootRD';

// default state
const defaultState = {};

const middleware = [thunkMiddleware];
let storeEnhancers;

// In production, we want to use just the middleware
// if (process.env.NODE_ENV === 'development') {

	// In development, we want to use some store enhancers from redux-devtools

	// Enable redux devtools
	const isDevToolsAvailable = (typeof window === 'object' && typeof window.devToolsExtension !== 'undefined');

	const devTools = (isDevToolsAvailable ? window.devToolsExtension() : (func) => {

		return func;

	});

	// middleware.push(require('redux-immutable-state-invariant')());

	// Use Redux' compose utility function to apply several store enhancers in a row.
	storeEnhancers = compose(
		applyMiddleware(...middleware),
		devTools
	);

// } else {

// 	storeEnhancers = applyMiddleware(...middleware);

// }

const store = createStore(
	rootRD,
	defaultState,
	storeEnhancers
);

export default store;
