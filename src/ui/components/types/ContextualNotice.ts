import {FunctionComponent} from 'preact';
import {Purpose} from '../../types';

export interface ContextualNoticeOptions extends Record<string, string> {
	titleLevel?: '1' | '2' | '3' | '4' | '5' | '6';
}

export interface ContextualNoticeProps<Data extends ContextualNoticeOptions> {
	purpose: Purpose;
	data: Data;
	privacyPolicyUrl: string;
	privacyPolicyNewWindow?: boolean;
	onAccept: () => void;
}

export type ContextualNoticeComponent<
	Data extends ContextualNoticeOptions = ContextualNoticeOptions
> = FunctionComponent<ContextualNoticeProps<Data>>;
