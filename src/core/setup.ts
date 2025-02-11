import CookieConsentsRepository from './CookieConsentsRepository';
import CookiesConsentsEffect from './CookiesConsentsEffect';
import DomConsentsEffect from './DomConsentsEffect';
import GoogleConsentModeConsentsEffect from './google/GoogleConsentModeConsentsEffect';
import Manager from './Manager';
import {CookieOptions, Purpose} from './types';
import updatePurposeElements from './utils/updatePurposeElements';

type SetupOptions = {
	cookie?: CookieOptions;
};

export default (purposes: Purpose[], options: SetupOptions) => {
	const domEffect = new DomConsentsEffect(purposes, updatePurposeElements);
	const cookiesEffect = new CookiesConsentsEffect(purposes);
	const hasGoogleConsentMode = purposes.some(
		(purpose) => !!purpose?.googleConsentMode
	);

	const googleConsentModeEffect = hasGoogleConsentMode
		? new GoogleConsentModeConsentsEffect(purposes)
		: null;

	const repository = new CookieConsentsRepository(options?.cookie);
	const manager = new Manager(purposes, repository.read());
	const consents = manager.getAllConsents();

	manager.on('update', (diff, all) => {
		domEffect.apply(diff);
		cookiesEffect.apply(diff);
		googleConsentModeEffect?.apply(all);
		repository.write(all);
	});

	manager.on('clear', () => {
		repository.clear();
	});

	domEffect.apply(consents);
	cookiesEffect.apply(consents);

	return manager;
};
