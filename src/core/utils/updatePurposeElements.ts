export default (id: string, consent: boolean) => {
	if (consent) {
		document
			.querySelectorAll<HTMLTemplateElement>(
				`template[data-purpose="${id}"]:not([data-active])`
			)
			.forEach((template) => {
				template.dataset.active = 'active';
				const content = template.content.cloneNode(
					true
				) as DocumentFragment;

				Array.from(content.children).forEach((element: HTMLElement) => {
					// We're flagging each children with the
					// purpose id so we can find them again
					// if needed.
					element.dataset.purpose = template.dataset.purpose;
					template.insertAdjacentElement('afterend', element);
				});
			});
	} else {
		document
			.querySelectorAll<HTMLElement>(`[data-purpose="${id}"]`)
			.forEach((element) => {
				if (element.nodeName === 'TEMPLATE') {
					delete element.dataset.active;
				} else {
					element.remove();
				}
			});
	}
};
