import {
	fork,
} from 'redux-saga/effects';

export default function(req: Express.Request, {
	components,
	params,
}: IRenderProps) {
	return function* waitForAll() {
		const sagas = components.filter((component) => component && component.preload)
			.map((component) => component.preload(params, req))
			.reduce((result, results) => result.concat(results), []);

		for (let i = 0; i < sagas.length; i += 1) {
			yield fork(sagas[i]);
		}
	};
}
