import ConsentsEffect from '../ConsentsEffect';
import {ConsentsMap, Purpose} from '../types';
import {
	GoogleConsentModeState,
	GoogleConsentModeStates,
	GoogleConsentModeType
} from './types';

type Relationship = {
	purposeId: Purpose['id'];
	type: GoogleConsentModeType;
	default: boolean;
};

type BooleanStates = Partial<Record<GoogleConsentModeType, boolean>>;

export default class GoogleConsentModeConsentsEffect implements ConsentsEffect {
	readonly #relationships: Relationship[];

	constructor(purposes: Purpose[]) {
		this.#relationships = purposes
			.filter(({googleConsentMode}) => !!googleConsentMode)
			.flatMap(({id, googleConsentMode}) =>
				googleConsentMode.types.map((type) => ({
					type,
					default: googleConsentMode?.default || false,
					purposeId: id
				}))
			);
	}

	setDefaults(consents: ConsentsMap) {
		const states = this.fromBooleanStates(this.fromConsents(consents));

		window?.gtag?.('consent', 'default', states);
		window?.orejimeSetDefaultGoogleConsents?.(states);
	}

	apply(consents: ConsentsMap) {
		const states = this.fromBooleanStates(this.fromConsents(consents));

		window?.gtag?.('consent', 'update', states);
		window?.orejimeUpdateGoogleConsents?.(states);
	}

	private fromConsents(consents: ConsentsMap): BooleanStates {
		return this.#relationships
			.filter(({purposeId}) => purposeId in consents)
			.reduce<BooleanStates>(
				(states, rel) => ({
					...states,
					[rel.type]:
						rel.type in states
							? states[rel.type] && consents[rel.purposeId]
							: consents[rel.purposeId]
				}),
				{}
			);
	}

	private fromBooleanStates(states: BooleanStates): GoogleConsentModeStates {
		return Object.fromEntries(
			Object.entries(states).map(([type, state]) => [
				type,
				state
					? GoogleConsentModeState.granted
					: GoogleConsentModeState.denied
			])
		);
	}
}
