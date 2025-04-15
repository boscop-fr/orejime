import {expect, BrowserContext, Page, Locator} from '@playwright/test';
import Cookie from 'js-cookie';
import {Config} from '../src/ui/types';

export class OrejimePage {
	constructor(
		public readonly page: Page,
		public readonly context: BrowserContext
	) {}

	async load(config: Partial<Config>, body: string) {
		await this.page.route('/', async (route) => {
			await route.fulfill({
				body: `
					<!DOCTYPE html>

					<html>
						<head>
							<title>Orejime</title>
							<link rel="stylesheet" href="orejime-standard.css" />
						</head>

						<body>
							${body}

							<script>
								window.orejimeConfig = ${JSON.stringify(config)}
							</script>
							<script src="orejime-standard-en.js"></script>
						</body>
					</html>
				`
			});
		});

		await this.page.goto('/');
	}

	get banner() {
		return this.locator('.orejime-Banner');
	}

	get learnMoreBannerButton() {
		return this.locator('.orejime-Banner-learnMoreButton');
	}

	get firstFocusableElementFromBanner() {
		return this.locator('.orejime-Banner :is(a, button)').first();
	}

	get modal() {
		return this.locator('.orejime-Modal');
	}

	get closeModalButton() {
		return this.locator('.orejime-Modal-closeButton');
	}

	get contextualNotice() {
		return this.locator('.orejime-ContextualNotice');
	}

	get contextualNoticePlaceholder() {
		return this.locator('.orejime-ContextualNotice-placeholder');
	}

	locator(selector: string) {
		return this.page.locator(selector);
	}

	purposeCheckbox(purposeId: string) {
		return this.locator(`#orejime-purpose-${purposeId}`);
	}

	async acceptAllFromBanner() {
		await this.locator('.orejime-Banner-saveButton').click();
	}

	async declineAllFromBanner() {
		await this.locator('.orejime-Banner-declineButton').click();
	}

	async openModalFromBanner() {
		await this.learnMoreBannerButton.click();
	}

	async enableAllFromModal() {
		await this.locator('.orejime-PurposeToggles-enableAll').click();
	}

	async disableAllFromModal() {
		await this.locator('.orejime-PurposeToggles-disableAll').click();
	}

	async saveFromModal() {
		await this.locator('.orejime-Modal-saveButton').click();
	}

	async closeModalByClickingButton() {
		await this.locator('.orejime-Modal-closeButton').click();
	}

	async closeDialogByClickingOutside() {
		// We're clicking in a corner to avoid clicking on the
		// modal itself, which has no effect.
		await this.locator('body').click({
			position: {
				x: 1,
				y: 1
			}
		});
	}

	async closeModalByPressingEscape() {
		await this.page.keyboard.press('Escape');
	}

	async acceptContextualNotice() {
		await this.locator('.orejime-ContextualNotice-button').click();
	}

	async expectConsents(consents: Record<string, unknown>) {
		await expect(await this.getConsentsFromCookies()).toEqual(consents);
	}

	async getConsentsFromCookies() {
		const name = 'eu-consent';
		const cookies = await this.context.cookies();
		const {value} = cookies.find((cookie) => cookie.name === name)!;
		return JSON.parse(Cookie.converter.read(value, name));
	}

	// In specific conditions, browser events can get queued
	// up and won't be fired until some interaction with the
	// page.
	// We're using a dummy click to trigger queued events.
	// @see https://github.com/microsoft/playwright/issues/979
	emptyEventQueue() {
		return this.page.mouse.click(0, 0);
	}
}
