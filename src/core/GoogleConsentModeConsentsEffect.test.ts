import {jest} from '@jest/globals';
import GoogleConsentModeConsentsEffect from './GoogleConsentModeConsentsEffect';
import {Purpose} from './types';

describe('GoogleConsentModeConsentsEffect', () => {
	const purposes: Purpose[] = [
		{
			id: 'analytics',
			cookies: [],
			googleConsentMode: {
				default: true,
				types: ['analytics_storage']
			}
		},
		{
			id: 'ads',
			cookies: [],
			googleConsentMode: {
				types: ['ad_personalization', 'ad_storage', 'ad_user_data']
			}
		},
		{
			id: 'override',
			cookies: [],
			googleConsentMode: {
				default: true,
				types: ['ad_storage']
			}
		}
	];

	test('default', () => {
		const gtag = jest.fn();

		new GoogleConsentModeConsentsEffect(purposes, gtag);

		expect(gtag.mock.calls).toEqual([
			[
				'consent',
				'default',
				{
					'ad_personalization': 'denied',
					'ad_storage': 'denied',
					'ad_user_data': 'denied',
					'analytics_storage': 'granted'
				}
			]
		]);
	});

	test('update', () => {
		const gtag = jest.fn();
		const effect = new GoogleConsentModeConsentsEffect(purposes, gtag);

		effect.apply({
			analytics: false,
			ads: false,
			override: false
		});

		effect.apply({
			analytics: true,
			ads: false,
			override: false
		});

		effect.apply({
			analytics: false,
			ads: true,
			override: false
		});

		expect(gtag.mock.calls.slice(1)).toEqual([
			[
				'consent',
				'update',
				{
					'ad_personalization': 'denied',
					'ad_storage': 'denied',
					'ad_user_data': 'denied',
					'analytics_storage': 'denied'
				}
			],
			[
				'consent',
				'update',
				{
					'ad_personalization': 'denied',
					'ad_storage': 'denied',
					'ad_user_data': 'denied',
					'analytics_storage': 'granted'
				}
			],
			[
				'consent',
				'update',
				{
					'ad_personalization': 'granted',
					'ad_storage': 'denied',
					'ad_user_data': 'granted',
					'analytics_storage': 'denied'
				}
			]
		]);
	});
});
