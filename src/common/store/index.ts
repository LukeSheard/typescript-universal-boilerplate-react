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
	createStore,
	Reducer,
	Store,
} from 'redux';

export const reducer: Reducer<IAppState> = combineReducers<IAppState>({
	routing: routerReducer,
});

export default function(history: History, initialState: IAppState = {}): Store<IAppState> {
	const middlewares = [
		routerMiddleware(history),
	];

	const store = createStore(reducer, initialState, applyMiddleware(...middlewares));

	return store;
}
