import {
	AnchorHTMLAttributes,
	ComponentChildren,
	FunctionComponent
} from 'preact';

export interface ModalProps {
	isForced: boolean;
	needsUpdate: boolean;
	privacyPolicyUrl: string;
	privacyPolicyLinkAttributes?: AnchorHTMLAttributes;
	onClose: () => void;
	onSave: () => void;
	children: ComponentChildren;
}

export type ModalComponent = FunctionComponent<ModalProps>;
