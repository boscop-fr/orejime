import {Translations} from '../ui/types';

// Dutch.
export default {
	banner: {
		title: null,
		description:
			'Wij verzamelen en verwerken uw persoonlijke gegevens voor de volgende doeleinden: {purposes}.\nLees ons privacybeleid voor meer informatie {privacyPolicy}.',
		privacyPolicyLabel: 'privacybeleid',
		accept: 'Aanvaarden',
		acceptTitle: 'Alle cookies accepteren',
		decline: 'Afwijzen',
		declineTitle: 'Alle optionele cookies weigeren',
		configure: 'Lees meer',
		configureTitle: 'Cookies kiezen'
	},
	modal: {
		title: 'Informatie die we verzamelen',
		description:
			'Hier kunt u de informatie bekijken en aanpassen die we over u verzamelen.\nLees ons privacybeleid voor meer informatie {privacyPolicy}.',
		privacyPolicyLabel: 'privacybeleid',
		close: 'Sluiten',
		closeTitle: 'Sluit voorkeuren',
		globalPreferences: 'Voorkeuren voor alle services',
		acceptAll: 'Alles aanvaarden',
		declineAll: 'Alles weigeren',
		save: 'Opslaan',
		saveTitle: 'Mijn configuratie voor de informatievergaring opslaan'
	},
	contextual: {
		title: '"{purpose}" is inactief',
		description:
			'Sta cookies toe om toegang te krijgen tot deze functionaliteit.',
		accept: 'Toestaan',
		accepted: '"{purpose}" is nu toegestaan.'
	},
	purpose: {
		mandatory: 'altijd verplicht',
		mandatoryTitle: 'Deze applicatie is altijd vereist',
		exempt: 'afmelden',
		exemptTitle: 'Deze app is standaard geladen (maar je kunt je afmelden)',
		showMore: 'Laat meer zien',
		accept: 'Aanvaarden',
		decline: 'Afwijzen',
		enabled: 'geactiveerd',
		disabled: 'gedesactiveerd',
		partial: 'gedeeltelijk'
	},
	misc: {
		newWindowTitle: 'nieuw venster',
		updateNeeded:
			'Er waren wijzigingen sinds uw laatste bezoek, werk uw voorkeuren bij.',
		poweredBy: 'Aangedreven door Orejime'
	}
} satisfies Translations as Translations;
