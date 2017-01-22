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
		const call = generator.next().value;
		expect(call['@@redux-saga/IO']).toBeTruthy();
		expect(call.CALL.args).toEqual([]);
		expect(call.CALL.context).toBeNull();
		expect(generator.next().done).toBeTruthy;
	});
});
