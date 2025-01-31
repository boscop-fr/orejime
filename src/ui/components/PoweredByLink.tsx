import {useTranslations} from '../utils/hooks';

interface PoweredByLinkProps {
	className?: string;
}

const PoweredByLink = ({className}: PoweredByLinkProps) => {
	const t = useTranslations();

	return (
		<a
			className={className}
			title={`${t.misc.poweredBy} (${t.misc.newWindowTitle})`}
			href="https://orejime.boscop.fr"
			target="_blank"
		>
			{t.misc.poweredBy}
		</a>
	);
};

export default PoweredByLink;
