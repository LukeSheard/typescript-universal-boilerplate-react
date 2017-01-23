import createRoutes from 'common/routes';
import createStore from 'common/store';
import Devtools from 'common/store/devtools';
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
import 'sanitize.css/sanitize.css';
import rootSaga from './rootsaga';

const initialState: IAppState = (window as any).__INITIAL_STATE__ || {};

const store = createStore(browserHistory, initialState);
const history = syncHistoryWithStore(browserHistory, store);
const routes = createRoutes();
const DOMelement = document.getElementById('root');

match({
	history,
	routes,
}, (_, __, renderProps) => {
	store.run(rootSaga);

	ReactDOM.render((
		<Provider store={store}>
			<div>
				<Router {...renderProps} />
				{process.env.NODE_ENV !== 'production' ? <Devtools /> : null}
			</div>
		</Provider>
	), DOMelement);
});

if ((module as any).hot) {
	(module as any).hot.accept();
}
