import {ComponentChildren, FunctionComponent} from 'preact';
import {Purpose} from '../../types';
import {ConsentState} from './ConsentState';

export interface PurposeProps extends Omit<Purpose, 'cookies'> {
	consent: ConsentState;
	children?: ComponentChildren;
	onChange: (checked: boolean) => void;
}

export type PurposeComponent = FunctionComponent<PurposeProps>;
