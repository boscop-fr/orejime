import {purposesOnly} from '../utils/config';
import {useConfig, useManager, useTheme} from '../utils/hooks';

interface ContextualNoticeContainerProps {
	data: Record<string, string>;
}

const ContextualNoticeContainer = ({data}: ContextualNoticeContainerProps) => {
	const config = useConfig();
	const manager = useManager();
	const {ContextualNotice} = useTheme();

	if (!data?.purpose) {
		return null;
	}

	const purpose = purposesOnly(config.purposes).find(
		({id}) => id === data.purpose
	);

	if (!purpose) {
		return null;
	}

	const handleAccept = () => {
		manager.setConsent(purpose.id, true);
	};

	return (
		<div className="orejime-Env">
			<ContextualNotice
				purpose={purpose}
				data={data}
				onAccept={handleAccept}
			></ContextualNotice>
		</div>
	);
};

export default ContextualNoticeContainer;
