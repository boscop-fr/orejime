import {useState} from 'preact/hooks';
import {purposesOnly} from '../utils/config';
import {useConfig, useManager, useTheme, useTranslations} from '../utils/hooks';
import {template} from '../utils/template';
import {Purpose} from '../types';

interface ContextualNoticeContainerProps {
	purposeId: Purpose['id'];
	data: Record<string, string>;
	isEnabled: boolean;
}

const ContextualNoticeContainer = ({
	purposeId,
	data,
	isEnabled
}: ContextualNoticeContainerProps) => {
	const config = useConfig();
	const manager = useManager();
	const t = useTranslations();
	const {ContextualNotice} = useTheme();

	// There is an intermediate step to notify assistive
	// technologies, just after the notice is disabled from
	// the inside.
	const [isBeingDisabled, setIsBeingDisabled] = useState(false);

	if (!isEnabled && !isBeingDisabled) {
		return null;
	}

	const purpose = purposesOnly(config.purposes).find(
		({id}) => id === purposeId
	);

	if (!purpose) {
		return null;
	}

	// When the notice is closed, an invisible placeholder
	// is inserted and takes focus to announce the change to
	// assistive technologies.
	return (
		<div className="orejime-Env">
			{isEnabled ? (
				<ContextualNotice
					purpose={purpose}
					data={data}
					privacyPolicyUrl={config.privacyPolicyUrl}
					privacyPolicyNewWindow={config.privacyPolicyNewWindow}
					onAccept={() => {
						manager.setConsent(purpose.id, true);
						setIsBeingDisabled(true);
					}}
				></ContextualNotice>
			) : isBeingDisabled ? (
				<div
					id={`orejime-ContextualNotice-placeholder--${purpose.id}`}
					className="orejime-ContextualNotice-placeholder"
					title={template(t.contextual.accepted, {
						purpose: purpose.title
					}).join('')}
					tabIndex={-1}
					ref={(self) => {
						self?.focus();
					}}
					onFocusOut={() => {
						setIsBeingDisabled(false);
					}}
					data-testid="orejime-contextual-notice-placeholder"
				/>
			) : null}
		</div>
	);
};

export default ContextualNoticeContainer;
