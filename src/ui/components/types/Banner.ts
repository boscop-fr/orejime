import {FunctionComponent} from 'preact';
import {ImageDescriptor} from '../../types';

export interface BannerProps {
	isHidden: boolean;
	needsUpdate: boolean;
	purposeTitles: string[];
	privacyPolicyUrl: string;
	privacyPolicyNewWindow?: boolean;
	logo?: ImageDescriptor;
	onAccept: () => void;
	onDecline: () => void;
	onConfigure: () => void;
}

export type BannerComponent = FunctionComponent<BannerProps>;
