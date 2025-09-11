import {Translations} from '../ui/types';

// Occitan.
export default {
	banner: {
		title: null,
		description:
			'Reculhissèm e tractam vòstras informacions personalas amb la tòca seguenta : {purposes}.\nPer ne saber mai, mercés de legir nòstra {privacyPolicy}.',
		privacyPolicyLabel: 'politica de confidencialitat',
		accept: 'Acceptar',
		acceptTitle: 'Acceptar los cookies',
		decline: 'Refusar',
		declineTitle: 'Refusar los cookies',
		configure: 'Configurar',
		configureTitle: 'Configurar los cookies'
	},
	modal: {
		title: 'Las informacions que reculhissèm',
		description:
			'Aicí, podètz veire e personalizar las informacions que reculhissèm vos tocant.\nPer ne saber mai, mercés de legir nòstra {privacyPolicy}.',
		privacyPolicyLabel: 'politica de confidencialitat',
		close: 'Tancar',
		closeTitle: null,
		globalPreferences: 'Preferéncias per totes los servicis',
		acceptAll: 'Tot acceptar',
		declineAll: 'Tot refusar',
		save: 'Salvagardar',
		saveTitle: 'Salvagardar ma configuracion per las informacions collectadas'
	},
	contextual: {
		title: '"{purpose}" és inactiu',
		description: 'Autorizar los cookies a accedir a aquesta foncionalitat.',
		privacyPolicyLabel: 'politica de confidencialitat',
		accept: 'Permetre',
		accepted: '"{purpose}" es ara autorizat.'
	},
	purpose: {
		mandatory: 'tojors requerit',
		mandatoryTitle: 'Aquesta aplicacion es totjorn requerida',
		exempt: 'opt-out',
		exemptTitle:
			'Aquesta aplicacion es cargada per defaut (mas la podètz desactivar)',
		showMore: 'Mostrar mai',
		accept: 'Acceptar',
		decline: 'Refusar',
		enabled: 'Activat',
		disabled: 'Desactivat',
		partial: 'parciala'
	},
	misc: {
		newWindowTitle: 'fenèstra novèla',
		updateNeeded:
			'I aguèt de modificacions dempuèi vòstra darrièra visita, mercés d’actualizar vòstre consentiment.',
		poweredBy: 'Propulsat per Orejime'
	}
} satisfies Translations as Translations;
