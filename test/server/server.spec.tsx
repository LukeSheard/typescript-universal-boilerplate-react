import { Server } from 'http';
import createServer from 'server';
import * as request from 'supertest';

describe('Server', () => {
	describe('Create Server', () => {
		let unit: Server;
		beforeEach(() => {
			unit = createServer({
				chunks: () => ({
					javascript: {
						application: '/application.min.js',
						common: '/common.min.js',
					},
					styles: {
						application: '/application.min.css',
					},
				}),
			});
		});

		afterEach(() => {
			unit.close();
		});

		it('should be able to render an index page', (done) => {
			request(unit)
				.get('/')
				.expect(200, done);
		});
	});
});
