import {PurposeCookie} from '../types';
import {findDeletableCookies} from './deletePurposeCookies';

describe('deletePurposeCookies', () => {
	const cookieNames = ['foo', 'bar', 'foobar'];

	test.each<[PurposeCookie[], any[]]>([
		[[], []],
		[['none'], []],
		[['foo'], [{name: 'foo'}]],
		[[/foo/], [{name: 'foo'}, {name: 'foobar'}]],
		[['bar'], [{name: 'bar'}]],
		[
			[['bar', 'path', 'domain']],
			[{name: 'bar', path: 'path', domain: 'domain'}]
		],
		[
			[[/^bar/, 'path', 'domain']],
			[{name: 'bar', path: 'path', domain: 'domain'}]
		]
	])('findDeletableCookies(%j)', (cookies, expected) => {
		expect(findDeletableCookies(cookies, cookieNames)).toEqual(expected);
	});
});
