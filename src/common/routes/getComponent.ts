import {
	Route,
} from 'react-router';

interface ImportedRoute {
	default: Route;
}

function getRouteComponent(route: string) {
	return (_, cb: Function) => {
		return require.ensure([], (require) => {
			try {
				const routeModule = require<ImportedRoute>('./' + route + '/index.tsx');
				cb(null, routeModule.default);
			} catch (e) {
				try {
					const routeModule = require<ImportedRoute>('./' + route);
					cb(null, routeModule.default);
				} catch (e) {
					console.error(e.message);
					getRouteComponent('NotFound')(_, cb);
				}
			}
		});
	};
}

export default getRouteComponent;
