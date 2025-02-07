import {expect, BrowserContext, Page} from '@playwright/test';
import Cookie from 'js-cookie';
import {Config} from '../src/ui';

export class OrejimePage {
	constructor(
		public readonly page: Page,
		public readonly context: BrowserContext
	) {}

	async load(config: Partial<Config>, scripts: string) {
		await this.page.route('/', async (route) => {
			await route.fulfill({
				body: `
					<!DOCTYPE html>

					<html>
						<head>
							<title>Orejime</title>
							<link rel="stylesheet" href="orejime.css" />
						</head>

						<body>
							<script>
								window.orejimeConfig = ${JSON.stringify(config)}
							</script>
							<script src="orejime.js"></script>
							${scripts}
						</body>
					</html>
				`
			});
		});

		await this.page.goto('/');
	}

	get banner() {
		return this.page.locator('.orejime-Banner');
	}

	get learnMoreBannerButton() {
		return this.page.locator('.orejime-Banner-learnMoreButton');
	}

	get firstFocusableElementFromBanner() {
		return this.page.locator('.orejime-Banner :is(a, button)').first();
	}

	get modal() {
		return this.page.locator('.orejime-Modal');
	}

	purposeCheckbox(purposeId: string) {
		return this.page.locator(`#orejime-purpose-${purposeId}`);
	}

	async focusNext() {
		await this.page.keyboard.press('Tab');
	}

	async acceptAllFromBanner() {
		await this.page.locator('.orejime-Banner-saveButton').click();
	}

	async declineAllFromBanner() {
		await this.page.locator('.orejime-Banner-declineButton').click();
	}

	async openModalFromBanner() {
		await this.learnMoreBannerButton.click();
	}

	async enableAllFromModal() {
		await this.page.locator('.orejime-PurposeToggles-enableAll').click();
	}

	async disableAllFromModal() {
		await this.page.locator('.orejime-PurposeToggles-disableAll').click();
	}

	async saveFromModal() {
		await this.page.locator('.orejime-Modal-saveButton').click();
	}

	async closeModalByClickingButton() {
		await this.page.locator('.orejime-Modal-closeButton').click();
	}

	async closeModalByClickingOutside() {
		// We're clicking in a corner to avoid clicking on the
		// modal itself, which has no effect.
		await this.page.locator('.orejime-ModalOverlay').click({
			position: {
				x: 1,
				y: 1
			}
		});
	}

	async closeModalByPressingEscape() {
		await this.page.keyboard.press('Escape');
	}

	async expectConsents(consents: Record<string, unknown>) {
		expect(await this.getConsentsFromCookies()).toEqual(consents);
	}

	async getConsentsFromCookies() {
		const name = 'eu-consent';
		const cookies = await this.context.cookies();
		const {value} = cookies.find((cookie) => cookie.name === name)!;
		return JSON.parse(Cookie.converter.read(value, name));
	}

	async expectScriptAttributes(
		purposeId: string,
		attributes: Record<string, string>
	) {
		const script = await this.page.locator(
			`script[data-purpose="${purposeId}"]`
		);

		for (const k in attributes) {
			expect(script).toHaveAttribute(k, attributes[k]);
		}
	}
}
