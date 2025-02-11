import {jest} from '@jest/globals';
import GoogleConsentModeConsentsEffect from './GoogleConsentModeConsentsEffect';
import {Purpose} from '../types';

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

	test('setDefaults', () => {
		global.gtag = jest.fn();
		global.orejimeSetDefaultGoogleConsents = jest.fn();

		const effect = new GoogleConsentModeConsentsEffect(purposes);

		effect.setDefaults({
			analytics: false,
			ads: false,
			override: false
		})

		expect(global.gtag.mock.calls).toEqual([
			[
				'consent',
				'default',
				{
					'ad_personalization': 'denied',
					'ad_storage': 'denied',
					'ad_user_data': 'denied',
					'analytics_storage': 'denied'
				}
			]
		]);

		expect(global.orejimeSetDefaultGoogleConsents.mock.calls).toEqual([
			[
				{
					'ad_personalization': 'denied',
					'ad_storage': 'denied',
					'ad_user_data': 'denied',
					'analytics_storage': 'denied'
				}
			]
		]);
	});

	test('apply', () => {
		global.gtag = jest.fn();
		global.orejimeUpdateGoogleConsents = jest.fn();

		const effect = new GoogleConsentModeConsentsEffect(purposes);

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

		expect(global.gtag.mock.calls).toEqual([
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

		expect(global.orejimeUpdateGoogleConsents.mock.calls).toEqual([
			[
				{
					'ad_personalization': 'denied',
					'ad_storage': 'denied',
					'ad_user_data': 'denied',
					'analytics_storage': 'denied'
				}
			],
			[
				{
					'ad_personalization': 'denied',
					'ad_storage': 'denied',
					'ad_user_data': 'denied',
					'analytics_storage': 'granted'
				}
			],
			[
				{
					'ad_personalization': 'granted',
					'ad_storage': 'denied',
					'ad_user_data': 'granted',
					'analytics_storage': 'denied'
				}
			]
		]);
	});

	test('unset', () => {
		global.gtag = undefined;
		global.orejimeSetDefaultGoogleConsents = undefined;
		global.orejimeUpdateGoogleConsents = undefined;

		expect(() => {
			const effect = new GoogleConsentModeConsentsEffect(purposes);

			effect.setDefaults({
				analytics: true,
				ads: true,
				override: true
			});

			effect.apply({
				analytics: true,
				ads: true,
				override: true
			});
		}).not.toThrow();
	});
});
