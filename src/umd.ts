import setup, {OrejimeInstance} from './setup';
import type {Config, Translations} from './ui';
import {deepMerge} from './ui/utils/objects';
import {Theme} from './ui/components/types/Theme';

export type LoadOrejime = (config: Partial<Config>) => OrejimeInstance;

declare global {
	interface Window {
		orejimeConfig: Partial<Config>;
		orejime: OrejimeInstance;
		loadOrejime: LoadOrejime;
	}
}

export const setupUmd = (theme: Theme, translations: Translations) => {
	const load: LoadOrejime = (config) => {
		const orejime = setup(
			deepMerge(
				{
					translations
				},
				{
					...config,
					theme
				}
			)
		);

		// As Orejime is loaded asynchronously, we're
		// emitting an event to let potential listeners
		// know when it is done loading.
		if (typeof CustomEvent !== 'undefined') {
			document.dispatchEvent(
				new CustomEvent('orejime.loaded', {
					detail: orejime
				})
			);
		}

		return orejime;
	};

	const autoload = async () => {
		window.loadOrejime = load;

		if (window.orejimeConfig !== undefined && window.orejime === undefined) {
			window.orejime = load(window.orejimeConfig);
		}
	};

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', autoload);
	} else {
		autoload();
	}
};
