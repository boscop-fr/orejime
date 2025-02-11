import ConsentsRepository from './ConsentsRepository';
import {ConsentsMap, CookieOptions} from './types';
import {deleteCookie, getCookie, setCookie} from './utils/cookies';
import {deserializeConsents, serializeConsents} from './utils/purposes';

export default class CookieConsentsRepository implements ConsentsRepository {
	#options: CookieOptions;

	constructor(options: Partial<CookieOptions> = {}) {
		this.#options = {
			name: 'eu-consent',
			domain: undefined,
			duration: 120,
			stringify: serializeConsents,
			parse: deserializeConsents,
			...options
		};
	}

	read() {
		const {name, parse} = this.#options;
		const cookie = getCookie(name);
		return cookie ? parse(cookie) : {};
	}

	write(consents: ConsentsMap) {
		const {name, domain, duration, stringify} = this.#options;
		setCookie(name, stringify(consents), duration, domain);
	}

	clear() {
		deleteCookie(this.#options.name);
	}
}
