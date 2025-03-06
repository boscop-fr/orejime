import type {ElementReference} from '../types';

export const getElement = (
	reference: ElementReference,
	defaultElement?: HTMLElement
) => {
	if (!reference) {
		return defaultElement;
	}

	if (typeof reference === 'string') {
		return document.querySelector(reference) as HTMLElement;
	}

	return reference;
};

export const getRootElement = (reference: ElementReference) => {
	const element = getElement(reference) || document.createElement('div');

	if (!element.classList.contains('orejime-Root')) {
		element.classList.add('orejime-Root');
	}

	if (!element.parentNode) {
		document.body.insertBefore(element, document.body.firstChild);
	}

	return element;
};

// @see https://stackoverflow.com/a/326076/2391359
const isTopLevelFrame = () => {
	try {
		return window.self === window.top;
	} catch (e) {
		return true;
	}
};

// On Firefox, iframes can "steal" focus from the top level
// page. We don't want that to happen so we're moving focus
// at the top level only.
export const softFocus = (element?: HTMLElement) => {
	if (element && isTopLevelFrame()) {
		element?.focus();
	}
};

// A very minimal implementation tailored for the kind of
// elements used within the app.
export const findFirstFocusableChild = (element: HTMLElement) =>
	element.querySelector<HTMLElement>(
		'a[href], button:not([disabled]):not([aria-hidden]), [tabindex]:not([tabindex^="-"])'
	);
