import {Translations} from '../ui/types';

// Romanian.
export default {
	banner: {
		title: null,
		description:
			'Colectăm și procesăm informațiile dvs. personale în următoarele scopuri: {purposes}.\nPentru a afla mai multe, vă rugăm să citiți {privacyPolicy}.',
		privacyPolicyLabel: 'politica privacy',
		accept: 'Accepta',
		acceptTitle: 'Acceptați toate modulele cookie',
		decline: 'Renunță',
		declineTitle: 'Refuzați toate modulele cookie opționale',
		configure: 'Configurați',
		configureTitle: 'Configura cookie'
	},
	modal: {
		title: 'Informațiile pe care le colectăm',
		description:
			'Aici puteți vedea și personaliza informațiile pe care le colectăm despre dvs.\nPentru a afla mai multe, vă rugăm să citiți {privacyPolicy}.',
		privacyPolicyLabel: 'politica privacy',
		close: 'Aproape',
		closeTitle: 'Închideți preferințele',
		globalPreferences: 'Preferințe pentru toate serviciile',
		acceptAll: 'Accepta totul',
		declineAll: 'Refuză toate',
		save: 'Salvează',
		saveTitle: null
	},
	contextual: {
		title: '"{purpose}" este inactiv',
		description:
			'Permiteți cookie-urilor să acceseze această funcționalitate.',
		privacyPolicyLabel: 'politica privacy',
		accept: 'Permite',
		accepted: '"{purpose}" este acum permis.'
	},
	purpose: {
		mandatory: 'întotdeauna necesar',
		mandatoryTitle: 'Această aplicație este întotdeauna necesară',
		exempt: 'opt-out',
		exemptTitle:
			'Această aplicație este încărcată în mod implicit (dar puteți renunța)',
		showMore: 'Arata mai mult',
		accept: 'Accepta',
		decline: 'Renunță',
		enabled: 'activat',
		disabled: 'dezactivat',
		partial: 'parţial'
	},
	misc: {
		newWindowTitle: 'fereastră nouă',
		updateNeeded:
			'Au existat modificări de la ultima vizită, vă rugăm să actualizați consimțământul.',
		poweredBy: 'Realizat de Orejime'
	}
} satisfies Translations as Translations;
