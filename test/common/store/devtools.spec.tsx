import DevTools from 'common/store/devtools';
import { shallow } from 'enzyme';
import * as React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'

describe('Common: Store: DevTools', () => {
	const mockStore = configureStore();

	it('should fail without a store context', () => {
		console.error = jest.fn();
		shallow(<DevTools/>);
		expect(console.error).toHaveBeenCalledTimes(1);
	});

	it('should not call console.error when surrounded by provider', () => {
		const store = mockStore();
		console.error = jest.fn();
		const component = shallow((
			<Provider store={store}>
				<DevTools/>
			</Provider>
		));
		expect(console.error).toHaveBeenCalledTimes(0);
		expect(component.find(DevTools).length).toBe(1);
	});
});
