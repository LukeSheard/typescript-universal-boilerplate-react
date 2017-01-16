import { shallow } from 'enzyme';
import * as React from 'react';
import {
	createStore,
	Store,
} from 'redux';
import HTML from 'server/render/HTML';

describe('Server', () => {
	describe('<HTML />', () => {
		const chunks: IChunks = {
			javascript: {
				application: '/static/application.js',
				common: '/static/common.js',
			},
			styles: {
				application: '/static/style.css',
			},
		};
		const store: Store<IAppState> = createStore<IAppState>(() => ({
			routing: {},
		}));

		const component = shallow<HTML, {}>((
			<HTML chunks={chunks} store={store}>
				<div>Render HTML</div>
			</HTML>
		));

		it('should render a single div with the root element', () => {
			expect(component.find('div').length).toBe(1);
		});

		it('should render defined script tags', () => {
			const scripts = component.find('script');
			expect(scripts.length).toBe(3);
			expect(scripts.contains((
				<script
					src="/static/application.js"
					type="text/javascript"
				/>
			))).toBeTruthy;
			expect(scripts.contains((
				<script
					src="/static/common.js"
					type="text/javascript"
				/>
			))).toBeTruthy;
		});
	});
});
