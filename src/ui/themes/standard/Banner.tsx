import {useRef} from 'preact/hooks';
import {BannerComponent} from '../../components/types/Banner';
import {imageAttributes} from '../../utils/config';
import {useNonObscuringElement, useTranslations} from '../../utils/hooks';
import {template} from '../../utils/template';

const Banner: BannerComponent = ({
	isHidden,
	needsUpdate,
	purposeTitles,
	privacyPolicyUrl,
	privacyPolicyNewWindow,
	logo,
	onAccept: onSaveRequest,
	onDecline: onDeclineRequest,
	onConfigure: onConfigRequest
}) => {
	const ref = useRef<HTMLDivElement>();
	const t = useTranslations();

	useNonObscuringElement(ref);

	return (
		<div
			aria-hidden={isHidden}
			className="orejime-Banner"
			ref={ref}
			data-testid="orejime-banner"
		>
			<div className="orejime-Banner-body">
				{logo && (
					<div className="orejime-Banner-logoContainer">
						<img
							className="orejime-Banner-logo"
							{...imageAttributes(logo)}
						/>
					</div>
				)}

				<div className="orejime-Banner-text">
					{t.banner.title && (
						<h1
							className="orejime-Banner-title"
							id="orejime-Banner-title"
						>
							{t.banner.title}
						</h1>
					)}

					<p className="orejime-Banner-description">
						{template(t.banner.description, {
							purposes: (
								<strong
									key="purposes"
									className="orejime-Banner-purposes"
								>
									{purposeTitles.join(', ')}
								</strong>
							),
							privacyPolicy: (
								<a
									key="privacyPolicyLink"
									className="orejime-Banner-privacyPolicyLink"
									href={privacyPolicyUrl}
									{...(privacyPolicyNewWindow
										? {
												target: '_blank',
												rel: 'noopener noreferrer',
												title: t.misc.newWindowTitle
											}
										: {})}
								>
									{t.banner.privacyPolicyLabel}
								</a>
							)
						})}
					</p>
				</div>

				{needsUpdate && (
					<p className="orejime-Banner-changes">{t.misc.updateNeeded}</p>
				)}

				<ul className="orejime-Banner-actions orejime-ButtonList">
					<li className="orejime-Banner-actionItem orejime-Banner-actionItem--save">
						<button
							className="orejime-Button orejime-Button--save orejime-Banner-button orejime-Banner-saveButton"
							type="button"
							title={t.banner.acceptTitle}
							onClick={onSaveRequest}
							data-testid="orejime-banner-accept"
						>
							{t.banner.accept}
						</button>
					</li>
					<li className="orejime-Banner-actionItem orejime-Banner-actionItem--decline">
						<button
							className="orejime-Button orejime-Button--decline orejime-Banner-button orejime-Banner-declineButton"
							type="button"
							title={t.banner.declineTitle}
							onClick={onDeclineRequest}
							data-testid="orejime-banner-decline"
						>
							{t.banner.decline}
						</button>
					</li>
					<li className="orejime-Banner-actionItem orejime-Banner-actionItem--info">
						<button
							type="button"
							className="orejime-Button orejime-Button--info orejime-Banner-learnMoreButton"
							title={t.banner.configureTitle}
							onClick={onConfigRequest}
							data-testid="orejime-banner-configure"
						>
							{t.banner.configure}
						</button>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Banner;
