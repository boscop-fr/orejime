import {render} from 'preact';
import {ConsentsMap} from '../core/types';
import Manager from '../core/Manager';
import {Config, TitleLevel} from './types';
import Context from './components/Context';
import ContextualNoticeContainer from './components/ContextualNoticeContainer';
import ConsentsEffect from '../core/ConsentsEffect';
import {clamp} from './utils/numbers';

export default class ContextualConsentsEffect implements ConsentsEffect {
	readonly #config: Config;
	readonly #manager: Manager;
	#containers: WeakMap<HTMLTemplateElement, HTMLDivElement>;

	constructor(config: Config, manager: Manager) {
		this.#config = config;
		this.#manager = manager;
		this.#containers = new WeakMap();
	}

	apply(consents: ConsentsMap) {
		Object.entries(consents).forEach(([id, state]) => {
			document
				.querySelectorAll(`template[data-contextual][data-purpose="${id}"]`)
				.forEach((template: HTMLTemplateElement) => {
					this.#renderNotice(template, !state);
				});
		});
	}

	#renderNotice(template: HTMLTemplateElement, isEnabled: boolean) {
		render(
			<Context.Provider
				value={{
					config: this.#config,
					manager: this.#manager
				}}
			>
				<ContextualNoticeContainer
					{...this.#parseNoticeData(template.dataset)}
					isEnabled={isEnabled}
				/>
			</Context.Provider>,
			this.#getNoticeContainer(template)
		);
	}

	#parseNoticeData(data: DOMStringMap) {
		return {
			purposeId: data.purpose,
			titleLevel: clamp(
				parseInt(data.titleLevel, 10)
					|| this.#config?.contextual?.defaultTitleLevel
					|| 6,
				1,
				6
			) as TitleLevel
		};
	}

	#getNoticeContainer(template: HTMLTemplateElement) {
		if (!this.#containers.has(template)) {
			const container = document.createElement('div');
			container.style.display = 'contents';

			// The container is inserted before the template, so if
			// the user allows cookies from inside, the revealed
			// content is always after.
			template.insertAdjacentElement('beforebegin', container);
			this.#containers.set(template, container);
		}

		return this.#containers.get(template);
	}
}
