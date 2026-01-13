import {useTranslations} from '../../utils/hooks';
import {GlobalConsentComponent} from '../../components/types/GlobalConsent';

const GlobalConsent: GlobalConsentComponent = ({
	isEnabled,
	isDisabled,
	acceptAll,
	declineAll
}) => {
	const t = useTranslations();

	return (
		<ul className="orejime-PurposeToggles orejime-ButtonList">
			<li className="orejime-ButtonList-item">
				<button
					type="button"
					className="orejime-Button orejime-Button--info orejime-PurposeToggles-button orejime-PurposeToggles-enableAll"
					aria-disabled={isEnabled}
					onClick={acceptAll}
					data-testid="orejime-modal-enable-all"
				>
					{t.modal.acceptAll}
				</button>
			</li>

			<li className="orejime-ButtonList-item">
				<button
					type="button"
					className="orejime-Button orejime-Button--info orejime-PurposeToggles-button orejime-PurposeToggles-disableAll"
					aria-disabled={isDisabled}
					onClick={declineAll}
					data-testid="orejime-modal-disable-all"
				>
					{t.modal.declineAll}
				</button>
			</li>
		</ul>
	);
};

export default GlobalConsent;
