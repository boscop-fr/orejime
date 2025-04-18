import {Translations} from '../ui/types';

// Hungarian.
export default {
	banner: {
		title: null,
		description:
			'Az személyes adataidat összegyűjtjük és feldolgozzuk az alábbi célokra: {purposes}.\nTovábbi információért kérjük, olvassd el az {privacyPolicy}.',
		privacyPolicyLabel: 'adatvédelmi irányelveinket',
		accept: 'Elfogad',
		acceptTitle: 'Minden cookie elfogadása',
		decline: 'Elvet',
		declineTitle: 'Minden opcionális cookie elutasítása',
		configure: 'Konfigurálni',
		configureTitle: 'Konfigurálja a cookie-kat'
	},
	modal: {
		title: 'Információk, amiket gyűjtünk',
		description:
			'Itt láthatod és testreszabhatod az rólad gyűjtött információkat.\nTovábbi információért kérjük, olvassd el az {privacyPolicy}.',
		privacyPolicyLabel: 'adatvédelmi irányelveinket',
		close: 'Elvet',
		closeTitle: 'Beállítások bezárása',
		globalPreferences: 'Preferenciák az összes szolgáltatáshoz',
		acceptAll: 'Fogadj el mindent',
		declineAll: 'Elutasít minden',
		save: 'Mentés',
		saveTitle: null
	},
	contextual: {
		title: '"{purpose}" inaktív',
		description:
			'Engedélyezze a cookie-k számára, hogy hozzáférjenek ehhez a funkcióhoz.',
		accept: 'Engedélyezze',
		accepted: 'A {purpose} mostantól engedélyezett.'
	},
	purpose: {
		mandatory: 'mindig kötelező',
		mandatoryTitle: 'Ez az applikáció mindig kötelező',
		exempt: 'leiratkozás',
		exemptTitle:
			'Ez az alkalmazás alapértelmezés szerint betöltött (de ki lehet kapcsolni)',
		showMore: 'Tudjon meg többet',
		accept: 'Elfogad',
		decline: 'Elvet',
		enabled: 'engedélyezve van',
		disabled: 'letiltva',
		partial: 'részleges'
	},
	misc: {
		newWindowTitle: 'új ablak',
		updateNeeded:
			'Az utolsó látogatás óta változások történtek, kérjük, frissítsd a hozzájárulásodat.',
		poweredBy: 'Powered by Orejime'
	}
} satisfies Translations as Translations;
