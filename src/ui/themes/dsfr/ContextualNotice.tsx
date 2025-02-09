import {useTranslations} from '../../utils/hooks';
import type {
	ContextualNoticeComponent,
	ContextualNoticeOptions
} from '../../components/types/ContextualNotice';
import {template} from '../../utils/template';

interface DsfrContextualNoticeData extends ContextualNoticeOptions {
	titleLevel?: string;
}

const ContextualNotice: ContextualNoticeComponent<DsfrContextualNoticeData> = ({
	purpose,
	data,
	onAccept
}) => {
	const t = useTranslations();
	const {titleLevel} = data;
	const TitleTag = titleLevel ? `h${titleLevel}` : 'h4';
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
