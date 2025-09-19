import {useEffect, useRef} from 'preact/hooks';

interface DialogProps {
	isAlert?: boolean;
	label?: string;
	labelId?: string;
	className?: string;
	portalClassName?: string;
	overlayClassName?: string;
	htmlClassName?: string;
	onRequestClose?: () => void;
	children: any;
}

const Dialog = ({
	isAlert = false,
	label,
	labelId,
	className,
	portalClassName,
	overlayClassName,
	htmlClassName,
	onRequestClose,
	children
}: DialogProps) => {
	const dialogRef = useRef<HTMLDialogElement>();
	const containerRef = useRef<HTMLDivElement>();

	useEffect(() => {
		const handleCancel = (event: Event) => {
			if (onRequestClose) {
				event.preventDefault();
				onRequestClose();
			}
		};

		dialogRef.current.addEventListener('cancel', handleCancel);

		return () => {
			dialogRef.current.removeEventListener('cancel', handleCancel);
		};
	}, []);

	// Watches for clicks outside the dialog to close it.
	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			if (!onRequestClose) {
				return;
			}

			if (!(event.target instanceof Node)) {
				return;
			}

			if (
				event.target !== containerRef.current
				&& containerRef.current.contains(event.target)
			) {
				return;
			}

			event.preventDefault();
			onRequestClose();
		};

		// Using capture here prevents the handler from catching
		// the opening event, for example a click on a button,
		// which would close the dialog instantly.
		document.addEventListener('click', handleClick, true);

		return () => {
			document.removeEventListener('click', handleClick, true);
		};
	}, []);

	// Adds a class to the html tag when the dialog is open.
	useEffect(() => {
		if (htmlClassName) {
			document.documentElement.classList.add(htmlClassName);
		}

		return () => {
			if (htmlClassName) {
				document.documentElement.classList.remove(htmlClassName);
			}
		};
	}, []);

	useEffect(() => {
		const opener = document.activeElement;

		if (isAlert || onRequestClose) {
			dialogRef.current.showModal();
		} else {
			dialogRef.current.show();
		}

		// We're focusing back on the element that was active
		// when opening the dialog.
		return () => {
			if (opener instanceof HTMLElement) {
				setTimeout(() => {
					opener.focus();
				});
			}
		};
	}, []);

	return (
		<dialog
			ref={dialogRef}
			className={portalClassName}
			role={isAlert ? 'alertdialog' : 'dialog'}
			aria-modal="true"
			aria-label={label}
			aria-labelledby={labelId}
		>
			<div className={overlayClassName}>
				<div ref={containerRef} className={className}>
					{children}
				</div>
			</div>
		</dialog>
	);
};

export default Dialog;
