import {migrateConfig} from './config';

test('migrateConfig', () => {
	const stringify = () => {};
	const parse = () => {};

	const v2 = {
		appElement: '#app',
		elementID: 'orejime',
		ads: 'orejime',
		cookieName: 'orejime',
		cookieExpiresAfterDays: 365,
		cookieDomain: 'example.org',
		stringifyCookie: stringify,
		parseCookie: parse,
		privacyPolicy: 'http://example.org',
		default: true,
		mustConsent: false,
		mustNotice: false,
		lang: 'en',
		logo: false,
		debug: false,
		translations: {
			en: {
				consentModal: {
					description: 'Description'
				}
			}
		},
		apps: [
			{
				name: 'analytics-a',
				title: 'Tag Manager',
				cookies: ['a'],
				purposes: ['analytics'],
				required: false,
				optOut: false,
				default: true,
				onlyOnce: true,
				callback: () => {}
			},
			{
				name: 'ads',
				title: 'Ads',
				purposes: ['analytics'],
				cookies: [
					'ads',
					['ads', '/blog', '.' + location.hostname],
					['ads', '/', 'test.example.org']
				]
			},
			{
				name: 'analytics-b',
				title: 'External Tracker',
				purposes: ['analytics', 'security'],
				cookies: ['b'],
				required: true
			}
		],
		categories: [
			{
				name: 'analytics',
				title: 'Analytics',
				apps: ['analytics-a', 'analytics-b']
			}
		]
	};

	expect(migrateConfig(v2)).toEqual({
		orejimeElement: 'orejime',
		privacyPolicyUrl: 'http://example.org',
		forceBanner: false,
		forceModal: false,
		cookie: {
			name: 'orejime',
			domain: 'example.org',
			duration: 365,
			parse,
			stringify
		},
		purposes: [
			{
				id: 'analytics',
				title: 'Analytics',
				purposes: [
					{
						id: 'analytics-a',
						title: 'Tag Manager',
						cookies: ['a'],
						default: true,
						isExempt: false,
						isMandatory: false,
						runsOnce: true
					},
					{
						id: 'analytics-b',
						isMandatory: true,
						title: 'External Tracker',
						cookies: ['b']
					}
				]
			},
			{
				id: 'ads',
				title: 'Ads',
				cookies: [
					'ads',
					['ads', '/blog', '.localhost'],
					['ads', '/', 'test.example.org']
				]
			}
		]
	});
});
