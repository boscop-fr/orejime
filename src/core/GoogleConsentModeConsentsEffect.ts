import ConsentsEffect from './ConsentsEffect';
import {ConsentsMap, Purpose} from './types';

export type GoogleConsentModeType =
	| 'ad_personalization'
	| 'ad_storage'
	| 'ad_user_data'
	| 'analytics_storage'
	| 'functionality_storage'
	| 'personalization_storage'
	| 'security_storage';

export enum GoogleConsentModeState {
	granted = 'granted',
	denied = 'denied'
}

export type GoogleConsentModePurposeOptions = {
	default?: boolean;
	types: GoogleConsentModeType[];
};

type GoogleConsentModeRelationship = {
	purposeId: Purpose['id'];
	type: GoogleConsentModeType;
	default: boolean;
};

type GoogleConsentModeBooleanStates = Partial<
	Record<GoogleConsentModeType, boolean>
>;
type GoogleConsentModeStates = Partial<
	Record<GoogleConsentModeType, GoogleConsentModeState>
>;

type GoogleTag = (
	command: 'consent',
	arg: 'default' | 'update',
	params: GoogleConsentModeStates
) => void;

declare global {
	interface Window {
		gtag: GoogleTag;
	}
}

export default class GoogleConsentModeConsentsEffect implements ConsentsEffect {
	readonly #relationships: GoogleConsentModeRelationship[];
	readonly #tag: GoogleTag;

	constructor(purposes: Purpose[], tag) {
		this.#relationships = purposes
			.filter(({googleConsentMode}) => !!googleConsentMode)
			.flatMap(({id, googleConsentMode}) =>
				googleConsentMode.types.map((type) => ({
					type,
					default: googleConsentMode?.default || false,
					purposeId: id
				}))
			);

		const defaultStates = this.#relationships.reduce(
			(states, rel) => ({
				...states,
				[rel.type]:
					rel.type in states
						? states[rel.type] && rel.default
						: rel.default
			}),
			{} as GoogleConsentModeBooleanStates
		);

		this.#tag = tag;
		this.#tag('consent', 'default', this.fromBooleanStates(defaultStates));
	}

	apply(consents: ConsentsMap) {
		const states = this.#relationships
			.filter(({purposeId}) => purposeId in consents)
			.reduce(
				(states, rel) => ({
					...states,
					[rel.type]:
						rel.type in states
							? states[rel.type] && consents[rel.purposeId]
							: consents[rel.purposeId]
				}),
				{} as GoogleConsentModeBooleanStates
			);

		this.#tag('consent', 'update', this.fromBooleanStates(states));
	}

	private fromBooleanStates(
		states: GoogleConsentModeBooleanStates
	): GoogleConsentModeStates {
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
