import {type ConsentsMap} from '../core/types';
import {type OrejimeInstance} from '../setup';

interface GtmConfig {
	baseUrl: string;
	lang: string;
	theme: string;
	onConsentChange: (consents: ConsentsMap) => void;
}

declare global {
	interface Window {
		orejimeGtmConfig: GtmConfig;
	}
}

const {baseUrl, lang, theme, onConsentChange} = window.orejimeGtmConfig;

document.addEventListener(
	'orejime.loaded',
	(event: CustomEvent<OrejimeInstance>) => {
		event.detail.manager.on('update', (diff) => {
			onConsentChange(diff);
		});
	},
	{
		once: true
	}
);

if (theme === 'standard') {
	const style = document.createElement('link');
	style.rel = 'stylesheet';
	style.href = `${baseUrl}/orejime-${theme}.css`;
	document.head.appendChild(style);
}

const script = document.createElement('script');
script.src = `${baseUrl}/orejime-${theme}-${lang}.js`;
document.head.appendChild(script);
