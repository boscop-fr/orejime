import {PurposeCookie} from '../types';
import {deleteCookie, getCookieNames} from './cookies';
import {toRegex} from './regexes';

export default (cookies: PurposeCookie[]) => {
	const cookieNames = getCookieNames();

	cookies.forEach((pattern) => {
		let path: string;
		let domain: string;

		if (pattern instanceof Array) {
			[pattern, path, domain] = pattern;
		}

		const regex = toRegex(pattern);

		cookieNames
			.filter((name) => regex.test(name))
			.forEach((cookie) => {
				deleteCookie(cookie, path, domain);
			});
	});
};
