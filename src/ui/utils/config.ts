import {
	Config,
	ImageDescriptor,
	Purpose,
	PurposeList,
	Translations
} from '../types';

export const DefaultConfig: Partial<Config> = {
	privacyPolicyUrl: '',
	forceModal: false,
	forceBanner: false,
	translations: {} as Translations,
	purposes: []
};

export function assertConfigValidity(
	config: Partial<Config>
): asserts config is Config {
	if (!Object.keys(config.purposes).length) {
		throw new Error('Orejime config: you must define `purposes`');
	}

	if (!config.privacyPolicyUrl.length) {
		throw new Error('Orejime config: you must define `privacyPolicyUrl`');
	}
}

// Strips groups from a list of purposes and purpose groups.
export const purposesOnly = (purposes: PurposeList): Purpose[] =>
	purposes.flatMap((purpose) =>
		'purposes' in purpose
			? purposesOnly(purpose.purposes)
			: [purpose as Purpose]
	);

export const imageAttributes = (image: ImageDescriptor) => {
	if (typeof image === 'string') {
		return {
			src: image,
			alt: ''
		};
	}

	return {
		src: '',
		alt: '',
		...image
	};
};
