import createRoutes from 'common/routes';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
	browserHistory,
	Router,
} from 'react-router';

const routes = createRoutes();
const DOMelement = document.getElementById('root');

ReactDOM.render((
	<Router 
		history={browserHistory}
		routes={routes}
	/>
), DOMelement);
