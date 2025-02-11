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

export type GoogleConsentModeStates = Partial<
	Record<GoogleConsentModeType, GoogleConsentModeState>
>;

export type GoogleConsentModePurposeOptions = {
	default?: boolean;
	types: GoogleConsentModeType[];
};

interface Gtag {
	(command: 'consent', arg: 'default', params: GoogleConsentModeStates): void;
	(command: 'consent', arg: 'update', params: GoogleConsentModeStates): void;
}

declare global {
	interface Window {
		gtag?: Gtag;
		orejimeSetDefaultGoogleConsents?: (
			states: GoogleConsentModeStates
		) => void;
		orejimeUpdateGoogleConsents?: (states: GoogleConsentModeStates) => void;
	}
}
