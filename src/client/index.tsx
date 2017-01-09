import createRoutes from 'common/routes';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
	browserHistory,
	Router,
} from 'react-router';

ReactDOM.render((
	<Router history={browserHistory} routes={createRoutes()} />
), document.getElementById('root'));
