import Dialog from '../../components/Dialog';
import Banner from './Banner';
import {useTranslations} from '../../utils/hooks';
import {ModalBannerComponent} from '../../components/types/ModalBanner';

const ModalBanner: ModalBannerComponent = (props) => {
	const t = useTranslations();

	return (
		<Dialog
			overlayClassName="orejime-BannerOverlay"
			className="orejime-BannerWrapper"
			label={t.banner.title}
			isAlert
		>
			<Banner {...props} />
		</Dialog>
	);
};

export default ModalBanner;
