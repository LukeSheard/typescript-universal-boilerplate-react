import * as MockRequest from 'mock-express-request';
import * as React from 'react';
import waitforall from 'server/render/waitforall';

describe('Server: Render: Wait For All', () => {
	it('should call yield calling the preload methods', () => {
		class MockComponent extends React.Component<{}, {}> {
			public static preload() {
				return [
					jest.fn(),
				];
			}
		}
		const req: Express.Request = new MockRequest({
			method: 'GET',
			url: '/foo',
		});
		const renderProps: IRenderProps = {
			components: [
				MockComponent,
			],
			params: null,
		};
		const generator = waitforall(req, renderProps)();
		const action = generator.next().value;
		expect(action['@@redux-saga/IO']).toBeTruthy();
		expect(action.FORK.args).toEqual([]);
		expect(action.FORK.context).toBeNull();
		expect(generator.next().done).toBeTruthy;
	});
});
