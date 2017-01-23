import rootSaga from 'client/rootsaga';

describe('Client: Root Saga', () => {
	it('should return an empty array', () => {
		const unit = rootSaga();
		const unitValueOne = unit.next().value;
		expect(unitValueOne).toBeInstanceOf(Array);
		expect(unitValueOne.length).toBe(0);
		expect(unit.next().done).toBeTruthy();
	});
});
