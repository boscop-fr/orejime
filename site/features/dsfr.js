window.orejimeConfig = {
	purposes: [
		{
			id: 'mandatory',
			title: 'Cookies techniques',
			description:
				'Cookies nécéssaires au bon fonctionnement du site.',
			isMandatory: true
		},
		{
			id: 'third-party',
			title: 'Suivi tiers',
			description:
				'Cookies déposés par des partenaires',
			purposes: [
				{
					id: 'analytics',
					title: "Analyse d'audience"
				},
				{
					id: 'social',
					title: 'Réseaux sociaux',
					description: 'Médias et partage'
				}
			]
		}
	],
	privacyPolicyUrl: '#privacyPolicy'
};
