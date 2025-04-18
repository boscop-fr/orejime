import {Translations} from '../ui/types';

// Finnish.
export default {
	banner: {
		title: null,
		description:
			'Keräämme ja käsittelemme henkilötietoja seuraaviin tarkoituksiin: {purposes}.\nVoit lukea lisätietoja {privacyPolicy}.',
		privacyPolicyLabel: 'tietosuojasivultamme',
		accept: 'Hyväksy',
		acceptTitle: 'Hyväksy kaikki evästeet',
		decline: 'Hylkää',
		declineTitle: 'Hylkää kaikki valinnaiset evästeet',
		configure: 'Konfiguroida',
		configureTitle: 'Määritä evästeet'
	},
	modal: {
		title: 'Keräämämme tiedot',
		description:
			'Voit tarkastella ja muokata sinusta keräämiämme tietoja.\nVoit lukea lisätietoja {privacyPolicy}.',
		privacyPolicyLabel: 'tietosuojasivultamme',
		close: 'Sulje',
		closeTitle: 'Sulje asetukset',
		globalPreferences: 'Kaikkien palvelujen asetukset',
		acceptAll: 'Hyväksyä kaikki',
		declineAll: 'Hylkää kaikki',
		save: 'Tallenna',
		saveTitle: null
	},
	contextual: {
		title: '"{purpose}" ei ole aktiivinen',
		description: 'Salli evästeiden käyttää tätä toimintoa.',
		accept: 'Salli',
		accepted: '"{purpose}" on nyt sallittu.'
	},
	purpose: {
		mandatory: 'vaaditaan',
		mandatoryTitle: 'Sivusto vaatii tämän aina',
		exempt: 'ladataan oletuksena',
		exemptTitle: 'Ladataan oletuksena (mutta voit ottaa sen pois päältä)',
		showMore: 'Lue lisää',
		accept: 'Hyväksy',
		decline: 'Hylkää',
		enabled: 'käytössä',
		disabled: 'pois käytöstä',
		partial: 'osittainen'
	},
	misc: {
		newWindowTitle: 'uusi ikkuna',
		updateNeeded:
			'Olemme tehneet muutoksia ehtoihin viime vierailusi jälkeen, tarkista ehdot.',
		poweredBy: 'Palvelun tarjoaa Orejime'
	}
} satisfies Translations as Translations;
