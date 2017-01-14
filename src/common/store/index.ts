import {
	routerMiddleware,
	routerReducer,
} from 'react-router-redux';
import {
	applyMiddleware,
	combineReducers,
	createStore,
} from 'redux';
import {
	reducer as formReducer,
} from 'redux-form';
import createSagaMiddleware, {
	END,
} from 'redux-saga';

export const reducer = combineReducers({
	form: formReducer,
	routing: routerReducer,
});


export default function(history, initialState = {}) {
	const sagaMiddleware = createSagaMiddleware();
	const middlewares = [
		routerMiddleware(history),
		sagaMiddleware,
	];

	const store = createStore(reducer, initialState, applyMiddleware(...middlewares));

	(store as any).run = sagaMiddleware.run;
	(store as any).close = () => store.dispatch(END);

	return store;
}
