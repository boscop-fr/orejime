import {toRegex} from './regexes';

describe('toRegex', () => {
	test('should return a regex as-is', () => {
		const regex = new RegExp('pattern', 'gi');
		expect(toRegex(regex)).toEqual(regex);
	});

	test('should turn a pattern into a regex', () => {
		expect(toRegex('/pattern/')).toEqual(new RegExp('pattern'));
		expect(toRegex('/pattern/i')).toEqual(new RegExp('pattern', 'i'));

		// The only flag allowed is `i`
		expect(toRegex('/pattern/g')).not.toEqual(new RegExp('pattern', 'g'));
		expect(toRegex('/pattern/gi')).not.toEqual(new RegExp('pattern', 'gi'));
	});

	test('should turn a string into a regex', () => {
		expect(toRegex('pattern')).toEqual(new RegExp('^pattern$'));
		expect(toRegex('^pattern$')).toEqual(new RegExp('^\\^pattern\\$$'));
	});
});
