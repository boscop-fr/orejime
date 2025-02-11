window.orejimeConfig = {
	purposes: [
		{
			id: 'analytics',
			title: 'Analytics',
			googleConsentMode: {
				types: ['analytics_storage']
			}
		},
		{
			id: 'ads',
			title: 'Ads',
			googleConsentMode: {
				types: ['ad_storage']
			}
		}
	],
	privacyPolicyUrl: '#'
};

window.orejimeUpdateGoogleConsents = function (consents) {
	const text = JSON.stringify(consents, null, '  ');
	alert('Google consents were updated:\n\n' + text);
};
