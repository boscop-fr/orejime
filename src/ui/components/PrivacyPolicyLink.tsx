import {AnchorHTMLAttributes} from 'preact';
import {useTranslations} from '../utils/hooks';

interface PrivacyPolicyLinkProps extends AnchorHTMLAttributes {
	label: string;
	onExit?: () => void;
}

const PrivacyPolicyLink = ({
	label,
	onExit,
	...props
}: PrivacyPolicyLinkProps) => {
	const t = useTranslations();
	const isBlank = props?.target === '_blank';
	const title = isBlank ? `${label} (${t.misc.newWindowTitle})` : null;

	return (
		<a
			{...props}
			title={title}
			onClick={() => {
				if (onExit && !isBlank) {
					onExit();
				}
			}}
		>
			{label}
		</a>
	);
};

export default PrivacyPolicyLink;
