import {
	routerMiddleware,
	routerReducer,
} from 'react-router-redux';
import {
	applyMiddleware,
	combineReducers,
	createStore,
} from 'redux';

export const reducer = combineReducers({
	routing: routerReducer,
});


export default function(history, initialState = {}) {
	const middlewares = [
		routerMiddleware(history),
	];

	const store = createStore(reducer, initialState, applyMiddleware(...middlewares));

	return store;
}
