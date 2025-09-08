import {PurposeCookie, PurposeCookieProps} from '../types';
import {deleteCookie, getCookieNames} from './cookies';

const expandCookie = (cookie: PurposeCookie): PurposeCookieProps =>
	cookie instanceof Array ? cookie : [cookie, undefined, undefined];

const matcher = (pattern: string | RegExp) =>
	pattern instanceof RegExp
		? (name: string) => pattern.test(name)
		: (name: string) => pattern === name;

export const findDeletableCookies = (
	cookies: PurposeCookie[],
	names: string[]
) =>
	cookies.flatMap((cookie) => {
		const [pattern, path, domain] = expandCookie(cookie);
		const test = matcher(pattern);

		return names.filter(test).map((name) => ({
			name,
			path,
			domain
		}));
	});

export default (cookies: PurposeCookie[]) => {
	findDeletableCookies(cookies, getCookieNames()).forEach(
		({name, path, domain}) => {
			deleteCookie(name, path, domain);
		}
	);
};
