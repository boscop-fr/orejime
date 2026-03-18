import {useTranslations} from '../../utils/hooks';
import type {ContextualNoticeComponent} from '../../components/types/ContextualNotice';
import {template} from '../../utils/template';

const ContextualNotice: ContextualNoticeComponent = ({
	purpose,
	titleLevel,
	onAccept,
	privacyPolicyUrl
}) => {
	const t = useTranslations();
	const TitleTag: `h${typeof titleLevel}` = `h${titleLevel}`;
	const templateProps = {
		purpose: purpose.title,
		privacyPolicy: (
			<a key="privacyPolicyUrl" href={privacyPolicyUrl}>
				{t.contextual.privacyPolicyLabel}
			</a>
		)
	};

	return (
		<div
			className="orejime-ContextualNotice"
			data-testid="orejime-contextual-notice"
		>
			<TitleTag
				className="orejime-ContextualNotice-title"
				data-testid="orejime-contextual-notice-title"
			>
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
