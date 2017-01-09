import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
	browserHistory,
	Router,
} from 'react-router';
import createRoutes from '../common/routes';

ReactDOM.render((
	<Router history={browserHistory} routes={createRoutes()} />
), document.getElementById('root'));
