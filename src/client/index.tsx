import createRoutes from 'common/routes';
import createStore from 'common/store';
import 'normalize.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
	Provider,
} from 'react-redux';
import {
	browserHistory,
	match,
	Router,
} from 'react-router';
import {
	syncHistoryWithStore,
} from 'react-router-redux';

const initialState = (window as any).__INITIAL_STATE__ || {};

const store = createStore(browserHistory, initialState);
const history = syncHistoryWithStore(browserHistory, store);
const routes = createRoutes();
const DOMelement = document.getElementById('root');

match({
	history,
	routes,
}, (_, __, renderProps) => {
	ReactDOM.render((
		<Provider store={store}>
			<Router {...renderProps} />
		</Provider>
	), DOMelement);
});

if ((module as any).hot) {
	(module as any).hot.accept();
}
