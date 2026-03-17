import {useTranslations} from '../../utils/hooks';
import type {ContextualNoticeComponent} from '../../components/types/ContextualNotice';
import {template} from '../../utils/template';

const ContextualNotice: ContextualNoticeComponent = ({
	purpose,
	titleLevel,
	onAccept
}) => {
	const t = useTranslations();
	const TitleTag: `h${typeof titleLevel}` = `h${titleLevel}`;
	const templateProps = {
		purpose: purpose.title
	};

	return (
		<div class="fr-consent-placeholder">
			<TitleTag class="fr-h6 fr-mb-2v">
				{template(t.contextual.title, templateProps)}
			</TitleTag>

			<p class="fr-mb-6v">
				{template(t.contextual.description, templateProps)}
			</p>

			<button
				class="fr-btn"
				title={
					t.contextual.acceptTitle
						? template(t.contextual.acceptTitle, templateProps).join('')
						: null
				}
				onClick={onAccept}
			>
				{template(t.contextual.accept, templateProps)}
			</button>
		</div>
	);
};

export default ContextualNotice;
