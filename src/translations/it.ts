import {Translations} from '../ui/types';

// Italian.
export default {
	banner: {
		title: null,
		description:
			'Raccogliamo ed elaboriamo le vostre informazioni personali per i seguenti scopi: {purposes}.\nPer saperne di più, leggi la nostra {privacyPolicy}.',
		privacyPolicyLabel: 'policy privacy',
		accept: 'Accetto',
		acceptTitle: 'Accettare tutti i cookie',
		decline: 'Rifiuta',
		declineTitle: 'Rifiutare tutti i cookie opzionali',
		configure: 'Configurare',
		configureTitle: 'Configurare i cookie'
	},
	modal: {
		title: 'Informazioni che raccogliamo',
		description:
			'Qui puoi vedere e scegliere le informazioni che raccogliamo su di te.\nPer saperne di più, leggi la nostra {privacyPolicy}.',
		privacyPolicyLabel: 'policy privacy',
		close: 'Chiudere',
		closeTitle: 'Chiudi preferenze',
		globalPreferences: 'Preferenze globali',
		acceptAll: 'Accettare tutto',
		declineAll: 'Rifiuta tutto',
		save: 'Salva',
		saveTitle: null
	},
	contextual: {
		title: '"{purpose}" è inattivo',
		description: 'Consenti ai cookie di accedere a questa funzionalità.',
		accept: 'Permettere',
		accepted: '"{purpose}" ora è consentito.'
	},
	purpose: {
		mandatory: 'sempre richiesto',
		mandatoryTitle: "Quest'applicazione è sempre richiesta",
		exempt: 'opt-out',
		exemptTitle:
			"Quest'applicazione è caricata di default (ma puoi disattivarla)",
		showMore: 'Mostra di più',
		accept: 'Accetto',
		decline: 'Rifiuta',
		enabled: 'abilitata',
		disabled: 'disabilitata',
		partial: 'parziale'
	},
	misc: {
		newWindowTitle: 'nuova finestra',
		updateNeeded:
			'Ci sono stati cambiamenti dalla tua ultima visita, aggiorna il tuo consenso.',
		poweredBy: 'Realizzato da Orejime'
	}
} satisfies Translations as Translations;
