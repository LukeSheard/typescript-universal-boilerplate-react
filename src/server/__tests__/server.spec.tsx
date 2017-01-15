import { Express } from 'express';
import * as request from 'supertest';
import createServer from '../index';

describe('Server', () => {
	describe('Create Server', () => {
		const unit: Express = createServer({
			chunks: () => ({
				javascript: {},
				styles: {},
			}),
		});

		it('should have initialized', (done) => {
			request(unit)
				.get('/status')
				.expect(200, done);
		});

		it('should be able to render an index page', (done) => {
			request(unit)
				.get('/')
				.expect(200, done);
		});
	});
});
