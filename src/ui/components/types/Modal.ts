import {ComponentChildren, FunctionComponent} from 'preact';

export interface ModalProps {
	isForced: boolean;
	needsUpdate: boolean;
	privacyPolicyUrl: string;
	onClose: () => void;
	onSave: () => void;
	children: ComponentChildren;
}

export type ModalComponent = FunctionComponent<ModalProps>;
