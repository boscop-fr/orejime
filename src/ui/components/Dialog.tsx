import {useEffect, useLayoutEffect, useRef, useState} from 'preact/hooks';
import {findFirstFocusableChild, findFocusableChildren} from '../utils/dom';

interface DialogProps {
	isAlert?: boolean;
	label?: string;
	labelId?: string;
	className?: string;
	portalClassName?: string;
	overlayClassName?: string;
	htmlClassName?: string;
	// the scroll position stuff is for iOS to work correctly
	// when we want to prevent normal website scrolling with
	// the modal opened
	//
	// /!\ this requires specific CSS to work. For example,
	// if `htmlClassName = 'modal-open'`:
	//
	// ```
	// .modal-open {
	//   height: 100%;
	// }
	//
	// .modal-open body {
	//   position: fixed;
	//   overflow: hidden;
	//   height: 100%;
	//   width: 100%;
	// }
	// ```
	handleScrollPosition?: boolean;
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
	handleScrollPosition = true,
	onRequestClose,
	children
}: DialogProps) => {
	const [scrollPosition, setScrollPosition] = useState<number | null>(null);
	const portal = useRef<HTMLDivElement>();
	const activeElement = useRef<Element>();

	const handleClick = (event: Event) => {
		if (event.target === event.currentTarget) {
			onRequestClose();
		}
	};

	const handleFocusOut = (event: FocusEvent) => {
		const focusedElement = event.relatedTarget;

		if (!(focusedElement instanceof HTMLElement)) {
			return;
		}

		if (portal.current.contains(focusedElement)) {
			return;
		}

		const focusable = findFocusableChildren(portal.current);
		const isFocusedElementAfterDialog =
			portal.current.compareDocumentPosition(focusedElement)
			& Node.DOCUMENT_POSITION_FOLLOWING;

		const index = isFocusedElementAfterDialog ? 0 : focusable.length - 1;

		focusable.item(index).focus();
	};

	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'Escape') {
			onRequestClose();
		}
	};

	useLayoutEffect(() => {
		if (scrollPosition === null) {
			setScrollPosition(window.pageYOffset);
		}
	});

	useEffect(() => {
		if (scrollPosition !== null) {
			// setTimeout() avoids a race condition of some sort
			setTimeout(() => {
				if (handleScrollPosition) {
					window.scrollTo(window.pageXOffset, scrollPosition);
				}

				setScrollPosition(null);
			}, 0);
		}
	});

	useEffect(() => {
		activeElement.current = document.activeElement;

		if (htmlClassName) {
			document.documentElement.classList.add(htmlClassName);
		}

		findFirstFocusableChild(portal.current)?.focus();

		return () => {
			if (htmlClassName) {
				document.documentElement.classList.remove(htmlClassName);
			}

			setTimeout(() => {
				if (activeElement.current instanceof HTMLElement) {
					activeElement.current.focus();
				}
			}, 0);
		};
	}, []);

	return (
		<div ref={portal} className={portalClassName}>
			<div
				className={overlayClassName}
				tabIndex={-1}
				onMouseUp={isAlert ? null : handleClick}
				onTouchEnd={isAlert ? null : handleClick}
				onFocusOut={handleFocusOut}
				onKeyDown={handleKeyDown}
			>
				<div
					className={className}
					role={isAlert ? 'alertdialog' : 'dialog'}
					aria-modal="true"
					aria-label={label}
					aria-labelledby={labelId}
				>
					{children}
				</div>
			</div>
		</div>
	);
};

export default Dialog;
