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

// Translates an element vertically by a given offset,
// relatively to its current translation.
const translateElementY = (
	element: HTMLElement,
	offset: number,
	direction?: 1 | -1
) => {
	const base = Number(element.dataset.translation) || 0;
	const translation = base + offset * direction;

	// We're only moving the element if the translation has
	// the given direction, as we don't want it to move the
	// other way.
	if (Math.sign(translation) === Math.sign(direction)) {
		element.dataset.translation = translation.toString();
		element.style.transform = `translateY(${translation}px)`;
	} else {
		delete element.dataset.translation;
		element.style.transform = '';
	}
};

const getCollisionPadding = (element: HTMLElement) => {
	const styles = window.getComputedStyle(element);
	const padding = styles.getPropertyValue('--orejime-collision-padding');
	return padding.length ? parseInt(padding, 10) : 16;
};

const getPaddedBoundingBox = (element: DOMRect, padding: number) => ({
	top: element.top + padding,
	right: element.right + padding,
	bottom: element.bottom + padding,
	left: element.left + padding
});

// Resolves a visual collision between two elements, either
// by scrolling the page or moving one of them.
// We're only resolving collisions on the vertical axis, as
// it is the main direction of web pages.
export const resolveCollision = (fixed: HTMLElement, mobile: HTMLElement) => {
	if (mobile.contains(fixed)) {
		translateElementY(mobile, 0);
		return;
	}

	// We're padding the fixed element's bounding box to
	// avoid snapping the mobile one right on its border.
	const fixedRect = getPaddedBoundingBox(
		fixed.getBoundingClientRect(),
		getCollisionPadding(mobile)
	);

	const mobileRect = mobile.getBoundingClientRect();
	const isCollidingX =
		mobileRect.left < fixedRect.right && mobileRect.right > fixedRect.left;

	if (!isCollidingX) {
		translateElementY(mobile, 0);
		return;
	}

	const mobileCenterY = mobileRect.top + mobileRect.height / 2;
	const direction = mobileCenterY > window.innerHeight / 2 ? 1 : -1;
	const overlap =
		direction > 0
			? fixedRect.bottom - mobileRect.top
			: mobileRect.bottom - fixedRect.top;

	const isCollidingY =
		mobileRect.top < fixedRect.bottom && mobileRect.bottom > fixedRect.top;

	if (!isCollidingY) {
		translateElementY(mobile, overlap, direction);
		return;
	}

	const doc = document.documentElement;
	const leeway =
		direction > 0
			? Math.abs(doc.scrollHeight - doc.clientHeight - doc.scrollTop)
			: doc.scrollTop;

	// We're scrolling as much possible first.
	window.scrollBy({
		top: overlap * direction
	});

	// If scrolling isn't enough to get out of trouble,
	// we're moving the mobile element out of the way.
	if (overlap > leeway) {
		translateElementY(mobile, overlap - leeway, direction);
	}
};
