import {useTranslations} from '../../utils/hooks';
import type {
	ContextualNoticeComponent,
	ContextualNoticeOptions
} from '../../components/types/ContextualNotice';
import {template} from '../../utils/template';
import PrivacyPolicyLink from '../../components/PrivacyPolicyLink';

const ContextualNotice: ContextualNoticeComponent = ({
	purpose,
	data,
	onAccept,
	privacyPolicyUrl,
	privacyPolicyLinkAttributes
}) => {
	const t = useTranslations();
	const {titleLevel} = data;
	const TitleTag: `h${ContextualNoticeOptions['titleLevel']}` | 'strong' =
		titleLevel ? `h${titleLevel}` : 'strong';
	const templateProps = {
		purpose: purpose.title,
		privacyPolicy: (
			<PrivacyPolicyLink
				{...privacyPolicyLinkAttributes}
				key="privacyPolicyLink"
				href={privacyPolicyUrl}
				label={t.contextual.privacyPolicyLabel}
			/>
		)
	};

	return (
		<div
			className="orejime-ContextualNotice"
			data-testid="orejime-contextual-notice"
		>
			<TitleTag className="orejime-ContextualNotice-title">
				{template(t.contextual.title, templateProps)}
			</TitleTag>

			<p className="orejime-ContextualNotice-description">
				{template(t.contextual.description, templateProps)}
			</p>

			<button
				className="orejime-ContextualNotice-button orejime-Button"
				title={
					t.contextual.acceptTitle
						? template(t.contextual.acceptTitle, templateProps).join('')
						: null
				}
				onClick={onAccept}
				data-testid="orejime-contextual-notice-accept"
			>
				{template(t.contextual.accept, templateProps)}
			</button>
		</div>
	);
};

export default ContextualNotice;
