import {jest} from '@jest/globals';
import DomConsentsEffect from './DomConsentsEffect';
import {Purpose} from './types';

describe('DomConsentsEffect', () => {
	test('apply', () => {
		const purposes: Purpose[] = [
			{id: 'a', cookies: []},
			{id: 'b', cookies: [], runsOnce: true}
		];

		const apply = jest.fn();
		const effect = new DomConsentsEffect(purposes, apply);

		effect.apply({
			a: true,
			b: true
		});

		effect.apply({
			a: false,
			b: false
		});

		effect.apply({
			a: true,
			b: true
		});

		expect(apply.mock.calls).toEqual([
			['a', true],
			['b', true],
			['a', false],
			['b', false],
			['a', true]
			// `b` is not set to true again because it already ran.
		]);
	});
});
