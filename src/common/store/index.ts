import * as config from 'config';
import {
	History,
} from 'history';
import {
	routerMiddleware,
	routerReducer,
} from 'react-router-redux';
import {
	applyMiddleware,
	combineReducers,
	compose,
	createStore,
	Middleware,
	Reducer,
	Store,
} from 'redux';
import {
	reducer as formReducer,
} from 'redux-form';
import * as createLogger from 'redux-logger';
import createSagaMiddleware, {
	END,
	SagaMiddleware,
} from 'redux-saga';
import Devtools from './devtools';

export const reducer: Reducer<IAppState> = combineReducers<IAppState>({
	form: formReducer,
	routing: routerReducer,
});

interface ISagaStore<S> extends Store<S> {
	run?: Function;
	close?: Function;
}

export default function(history: History, initialState: IAppState = {}): Store<IAppState> {
	const sagaMiddleware: SagaMiddleware = createSagaMiddleware();
	const middlewares: Middleware[] = [
		routerMiddleware(history),
		sagaMiddleware,
	];
	if (config.dev) {
		middlewares.push(
			createLogger(),
		);
	}

	let enhancers = applyMiddleware(...middlewares);
	if (config.dev) {
		enhancers = compose(enhancers, Devtools.instrument());
	}

	const store: ISagaStore<IAppState> = createStore<IAppState>(reducer, initialState, enhancers);
	store.run = sagaMiddleware.run;
	store.close = () => store.dispatch(END);

	return store;
}
