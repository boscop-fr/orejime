import {FunctionComponent} from 'preact';
import {Purpose} from '../../types';

export type ContextualNoticeOptions = Record<string, string>;

export interface ContextualNoticeProps<Data extends ContextualNoticeOptions> {
	purpose: Purpose;
	data: Data;
	onAccept: () => void;
}

export type ContextualNoticeComponent<
	Data extends ContextualNoticeOptions
> = FunctionComponent<ContextualNoticeProps<Data>>;
