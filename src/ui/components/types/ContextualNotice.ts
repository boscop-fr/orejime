import {FunctionComponent} from 'preact';
import {Purpose, TitleLevel} from '../../types';

export interface ContextualNoticeProps {
	purpose: Purpose;
	titleLevel: TitleLevel;
	privacyPolicyUrl: string;
	onAccept: () => void;
}

export type ContextualNoticeComponent =
	FunctionComponent<ContextualNoticeProps>;
