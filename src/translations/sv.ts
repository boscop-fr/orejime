import {Translations} from '../ui/types';

// Swedish.
export default {
	banner: {
		title: null,
		description:
			'Vi samlar och bearbetar din personliga data i följande syften: {purposes}.\nFör att veta mer, läs vår {privacyPolicy}.',
		privacyPolicyLabel: 'Integritetspolicy',
		accept: 'Acceptera',
		acceptTitle: 'Acceptera alla cookies',
		decline: 'Avböj',
		declineTitle: 'Avvisa alla valfria cookies',
		configure: 'Konfigurera',
		configureTitle: 'Konfigurera cookies'
	},
	modal: {
		title: 'Information som vi samlar',
		description:
			'Här kan du se och anpassa vilken information vi samlar om dig.\nFör att veta mer, läs vår {privacyPolicy}.',
		privacyPolicyLabel: 'Integritetspolicy',
		close: 'Stäng',
		closeTitle: 'Nära preferenser',
		globalPreferences: 'Preferenser för alla tjänster',
		acceptAll: 'Acceptera alla',
		declineAll: 'Tacka nej till alla',
		save: 'Spara',
		saveTitle: null
	},
	contextual: {
		title: '"{purpose}" är inaktiv',
		description: 'Tillåt cookies att få tillgång till denna funktionalitet.',
		accept: 'Tillåta',
		accepted: '"{purpose}" är nu tillåtet.'
	},
	purpose: {
		mandatory: 'Krävs alltid',
		mandatoryTitle: 'Den här applikationen krävs alltid',
		exempt: 'Avaktivera',
		exemptTitle:
			'Den här appen laddas som standardinställning (men du kan avaktivera den)',
		showMore: 'Visa mer',
		accept: 'Acceptera',
		decline: 'Avböj',
		enabled: 'aktiverad',
		disabled: 'deaktiverad',
		partial: 'partiell'
	},
	misc: {
		newWindowTitle: 'nytt fönster',
		updateNeeded:
			'Det har skett förändringar sedan ditt senaste besök, var god uppdatera ditt medgivande.',
		poweredBy: 'Körs på Orejime'
	}
} satisfies Translations as Translations;
