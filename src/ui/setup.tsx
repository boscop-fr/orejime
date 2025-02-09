import {createRef, render} from 'preact';
import {Manager} from '../core';
import Context from './components/Context';
import Main, {MainApi} from './components/Main';
import type {Config} from './types';
import {getRootElement} from './utils/dom';
import {once} from './utils/functions';
import {contextualConsentsEffect} from './contextualConsentsEffect';

export default (config: Config, manager: Manager) => {
	const element = getRootElement(config.orejimeElement);
	const apiRef = createRef<MainApi>();
	const show = once(() => {
		render(
			<Context.Provider
				value={{
					config,
					manager
				}}
			>
				<Main apiRef={apiRef} />
			</Context.Provider>,
			element
		);
	});

	const openModal = () => {
		show();
		apiRef.current!.openModal();
	};

	const contextualEffect = contextualConsentsEffect(config, manager);

	manager.on('update', (consents) => {
		contextualEffect(consents);
	});

	contextualEffect(manager.getAllConsents());

	manager.on('dirty', (isDirty) => {
		if (isDirty) {
			show();
		}
	});

	if (manager.isDirty()) {
		show();
	}

	return {
		openModal
	};
};
