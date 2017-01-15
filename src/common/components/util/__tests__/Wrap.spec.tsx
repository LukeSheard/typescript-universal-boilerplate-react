import Wrap from '../Wrap';

describe('Wrap Component', () => {
	it('should render the components children', () => {
		expect(Wrap({ children: 'Test Children String' })).toEqual('Test Children String');
	});
});
