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

interface ISagaStore extends Store<IAppState> {
	run: Function;
	close: Function;
}

export default function(history: any, initialState: IAppState = {}): ISagaStore {
	const sagaMiddleware: SagaMiddleware = createSagaMiddleware();
	const middlewares: Middleware[] = [
		routerMiddleware(history),
		sagaMiddleware,
	];
	if (process.env.NODE_ENV !== 'production') {
		middlewares.push(
			createLogger(),
		);
	}

	let enhancers = applyMiddleware(...middlewares);
	if (process.env.NODE_ENV !== 'production') {
		enhancers = compose(enhancers, Devtools.instrument());
	}

	const store: Store<IAppState> = createStore<IAppState>(reducer, initialState, enhancers);
	(store as ISagaStore).run = sagaMiddleware.run;
	(store as ISagaStore).close = () => store.dispatch(END);

	return (store as ISagaStore);
}
