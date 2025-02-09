import {useTranslations} from '../../utils/hooks';
import type {
	ContextualNoticeComponent,
	ContextualNoticeOptions
} from '../../components/types/ContextualNotice';
import {template} from '../../utils/template';

interface StandardContextualNoticeOptions extends ContextualNoticeOptions {
	titleLevel?: string;
}

const ContextualNotice: ContextualNoticeComponent<StandardContextualNoticeOptions> = ({
	purpose,
	data,
	onAccept
}) => {
	const t = useTranslations();
	const {titleLevel} = data;
	const TitleTag = titleLevel ? `h${data.titleLevel}` : 'h2';
	const templateProps = {
		purpose: purpose.title
	};

	return (
		<div className="orejime-ContextualNotice">
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
			>
				{template(t.contextual.accept, templateProps)}
			</button>
		</div>
	);
};

export default ContextualNotice;
