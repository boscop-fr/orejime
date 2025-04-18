import ConsentsRepository from './ConsentsRepository';
import {ConsentsMap, CookieOptions} from './types';
import {deleteCookie, getCookie, setCookie} from './utils/cookies';

export default class CookieConsentsRepository implements ConsentsRepository {
	#options: CookieOptions;

	constructor(options: Partial<CookieOptions> = {}) {
		this.#options = {
			name: 'eu-consent',
			domain: undefined,
			duration: 120,
			sameSite: 'strict',
			parse: JSON.parse,
			stringify: JSON.stringify,
			...options
		};
	}

	read() {
		const {name, parse} = this.#options;
		const cookie = getCookie(name);
		return cookie ? parse(cookie) : {};
	}

	write(consents: ConsentsMap) {
		const {name, domain, duration, sameSite, stringify} = this.#options;
		setCookie(name, stringify(consents), duration, domain, sameSite);
	}

	clear() {
		deleteCookie(this.#options.name);
	}
}
