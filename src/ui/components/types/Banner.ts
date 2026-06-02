import {AnchorHTMLAttributes, FunctionComponent} from 'preact';
import {ImageDescriptor} from '../../types';

export interface BannerProps {
	isHidden: boolean;
	needsUpdate: boolean;
	purposeTitles: string[];
	privacyPolicyUrl: string;
	privacyPolicyLinkAttributes?: AnchorHTMLAttributes;
	logo?: ImageDescriptor;
	onAccept: () => void;
	onDecline: () => void;
	onConfigure: () => void;
}

export type BannerComponent = FunctionComponent<BannerProps>;
