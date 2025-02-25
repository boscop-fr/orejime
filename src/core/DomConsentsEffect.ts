import ConsentsEffect from './ConsentsEffect';
import {ConsentsMap, Purpose} from './types';

export type ApplyConsent = (purposeId: Purpose['id'], state: boolean) => void;

export default class DomConsentsEffect implements ConsentsEffect {
	readonly #apply: ApplyConsent;
	readonly #singletonPurposes: ConsentsMap;
	readonly #alreadyExecuted: ConsentsMap;

	constructor(purposes: Purpose[], apply: ApplyConsent) {
		this.#apply = apply;
		this.#singletonPurposes = Object.fromEntries(
			purposes.map(({id, runsOnce}) => [id, !!runsOnce])
		);

		this.#alreadyExecuted = Object.fromEntries(
			purposes.map(({id}) => [id, false])
		);
	}

	apply(consents: ConsentsMap) {
		Object.entries(consents)
			.filter(
				([id, consent]) =>
					!consent
					|| !this.#singletonPurposes[id]
					|| !this.#alreadyExecuted?.[id]
			)
			.forEach(([id, consent]) => {
				this.#apply(id, consent);
				this.#alreadyExecuted[id] = true;
			});
	}
}
