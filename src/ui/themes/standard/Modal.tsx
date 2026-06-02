import {Close} from './Icons';
import Dialog from '../../components/Dialog';
import {template} from '../../utils/template';
import {useTranslations} from '../../utils/hooks';
import {ModalComponent} from '../../components/types/Modal';
import PoweredByLink from '../../components/PoweredByLink';

const Modal: ModalComponent = ({
	isForced,
	needsUpdate,
	privacyPolicyUrl,
	privacyPolicyNewWindow,
	onClose,
	onSave,
	children
}) => {
	const t = useTranslations();

	return (
		<Dialog
			isAlert={isForced}
			labelId="orejime-modal-title"
			overlayClassName="orejime-ModalOverlay"
			className="orejime-ModalWrapper"
			onRequestClose={onClose}
		>
			<div className="orejime-Modal" data-testid="orejime-modal">
				<div className="orejime-Modal-header">
					{isForced ? null : (
						<button
							title={t.modal.closeTitle}
							className="orejime-Modal-closeButton"
							type="button"
							onClick={onClose}
							data-testid="orejime-modal-close"
						>
							<Close title={t.modal.close} />
						</button>
					)}

					<h1 className="orejime-Modal-title" id="orejime-modal-title">
						{t.modal.title}
					</h1>

					<p className="orejime-Modal-description">
						{isForced && needsUpdate ? (
							<p className="orejime-Modal-description">
								<strong className="orejime-Modal-changes">
									{t.misc.updateNeeded}
								</strong>
							</p>
						) : null}

						{template(t.modal.description, {
							privacyPolicy: (
								<a
									key="privacyPolicyLink"
									className="orejime-Modal-privacyPolicyLink"
									{...(!privacyPolicyNewWindow
										? {onClick: onClose}
										: {})}
									href={privacyPolicyUrl}
									{...(privacyPolicyNewWindow
										? {
												target: '_blank',
												rel: 'noopener noreferrer',
												title: t.misc.newWindowTitle
											}
										: {})}
								>
									{t.modal.privacyPolicyLabel}
								</a>
							)
						})}
					</p>
				</div>

				<form
					className="orejime-Modal-form"
					onSubmit={(event) => {
						event.preventDefault();
						onSave();
					}}
					onKeyDown={(event) => {
						// Prevents a bug where hitting the `Enter`
						// key on a checkbox submits the form.
						if (
							event.target.nodeName === 'INPUT'
							&& event.target.type === 'checkbox'
							&& event.key === 'Enter'
						) {
							event.preventDefault();
						}
					}}
				>
					<div className="orejime-Modal-body">{children}</div>
					<div className="orejime-Modal-footer">
						<button
							className="orejime-Button orejime-Button--save orejime-Modal-saveButton"
							title={t.modal.saveTitle}
							data-testid="orejime-modal-save"
						>
							{t.modal.save}
						</button>

						<PoweredByLink className="orejime-Modal-poweredByLink" />
					</div>
				</form>
			</div>
		</Dialog>
	);
};

export default Modal;
