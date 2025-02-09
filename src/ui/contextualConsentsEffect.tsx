import {render} from 'preact';
import {ConsentsMap, Manager} from '../core';
import {Config} from './types';
import Context from './components/Context';
import ContextualNoticeContainer from './components/ContextualNoticeContainer';

export const contextualConsentsEffect = (config: Config, manager: Manager) => {
	const templates = new WeakMap();

	return (consents: ConsentsMap) => {
		Object.entries(consents).forEach(([id, state]) => {
			document
				.querySelectorAll(`template[data-contextual][data-purpose="${id}"]`)
				.forEach((template: HTMLTemplateElement) => {
					if (!templates.has(template)) {
						const container = document.createElement('div');
						container.style.display = 'contents';
						template.insertAdjacentElement('afterend', container);
						templates.set(template, container);
					}

					render(
						state ? null : (
							<Context.Provider
								value={{
									config,
									manager
								}}
							>
								<ContextualNoticeContainer data={{...template.dataset}} />
							</Context.Provider>
						),
						templates.get(template)
					);
				});
		});
	};
};
