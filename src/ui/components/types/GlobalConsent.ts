import {FunctionComponent} from 'preact';

export interface GlobalConsentProps {
	isEnabled: boolean;
	isDisabled: boolean;
	acceptAll: () => void;
	declineAll: () => void;
}

export type GlobalConsentComponent = FunctionComponent<GlobalConsentProps>;
