import {
	routerMiddleware,
} from 'react-router-redux';
import {
	applyMiddleware,
	createStore,
} from 'redux';

import rootReducer from 'common/store/reducer';

export default function(history, initialState = {}) {
	const middlewares = [
		routerMiddleware(history),
	];

	const store = createStore(rootReducer, initialState, applyMiddleware(...middlewares));

	return store;
}
