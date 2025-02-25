import {test, expect} from '@playwright/test';
import {OrejimePage} from './OrejimePage';

test.describe('Orejime', () => {
	let orejimePage: OrejimePage;

	test.beforeEach(async ({page, context}) => {
		orejimePage = new OrejimePage(page, context);
		await orejimePage.load(
			{
				privacyPolicyUrl: 'https://example.org/privacy',
				purposes: [
					{
						id: 'mandatory',
						title: 'Mandatory',
						cookies: ['mandatory'],
						isMandatory: true
					},
					{
						id: 'group',
						title: 'Group',
						purposes: [
							{
								id: 'contextual',
								title: 'Contextual',
								cookies: ['contextual']
							},
							{
								id: 'other',
								title: 'Other',
								cookies: ['other']
							}
						]
					}
				]
			},
			`
				<template data-purpose="contextual" data-contextual>
					<iframe id="contextual" src=""></iframe>
				</template>

				<template data-purpose="mandatory">
					<script id="mandatory"></script>
				</template>
			`
		);
	});

	test('should show a banner', async () => {
		await expect(orejimePage.banner).toBeVisible();
	});

	test('should navigate to the banner first', async () => {
		await expect(orejimePage.firstFocusableElementFromBanner).toBeFocused();
	});

	test('should accept all purposes from the banner', async () => {
		await orejimePage.acceptAllFromBanner();
		await expect(orejimePage.banner).not.toBeVisible();

		await orejimePage.expectConsents({
			'mandatory': true,
			'contextual': true,
			'other': true
		});

		await expect(orejimePage.locator('#mandatory')).toBeAttached();
		await expect(orejimePage.locator('#contextual')).toBeVisible();
	});

	test('should decline all purposes from the banner', async () => {
		await orejimePage.declineAllFromBanner();
		await expect(orejimePage.banner).not.toBeVisible();

		await orejimePage.expectConsents({
			'mandatory': true,
			'contextual': false,
			'other': false
		});

		await expect(orejimePage.locator('#mandatory')).toBeAttached();
		await expect(orejimePage.locator('#contextual')).not.toBeAttached();
	});

	test('should open a modal', async () => {
		await orejimePage.openModalFromBanner();

		await expect(orejimePage.banner).toBeVisible();
		await expect(orejimePage.modal).toBeVisible();
	});

	test('should close the modal via the close button', async () => {
		await orejimePage.openModalFromBanner();
		await expect(orejimePage.modal).toBeVisible();

		await orejimePage.closeModalByClickingButton();
		await expect(orejimePage.modal).toHaveCount(0);
		await expect(orejimePage.banner).toBeVisible();
	});

	test('should close the modal via the overlay', async () => {
		await orejimePage.openModalFromBanner();
		await expect(orejimePage.modal).toBeVisible();

		await orejimePage.closeModalByClickingOutside();
		await expect(orejimePage.modal).toHaveCount(0);
		await expect(orejimePage.banner).toBeVisible();
	});

	test('should close the modal via `Escape` key', async () => {
		await orejimePage.openModalFromBanner();
		await expect(orejimePage.modal).toBeVisible();

		await orejimePage.closeModalByPressingEscape();
		await expect(orejimePage.modal).toHaveCount(0);
		await expect(orejimePage.banner).toBeVisible();
	});

	test('should move focus after closing the modal', async () => {
		await orejimePage.openModalFromBanner();
		await expect(orejimePage.modal).toBeVisible();

		await orejimePage.closeModalByPressingEscape();
		await expect(orejimePage.learnMoreBannerButton).toBeFocused();
	});

	test('should accept all purposes from the modal', async () => {
		await orejimePage.openModalFromBanner();
		await orejimePage.enableAllFromModal();
		await expect(orejimePage.purposeCheckbox('contextual')).toBeChecked();
		await expect(orejimePage.purposeCheckbox('mandatory')).toBeChecked();
		await orejimePage.saveFromModal();

		await orejimePage.expectConsents({
			'mandatory': true,
			'contextual': true,
			'other': true
		});
	});

	test('should decline all purposes from the modal', async () => {
		await orejimePage.openModalFromBanner();
		await orejimePage.enableAllFromModal();
		await orejimePage.disableAllFromModal();
		await expect(orejimePage.purposeCheckbox('contextual')).not.toBeChecked();
		await expect(orejimePage.purposeCheckbox('mandatory')).toBeChecked();
		await orejimePage.saveFromModal();

		await orejimePage.expectConsents({
			'mandatory': true,
			'contextual': false,
			'other': false
		});
	});

	test('should sync grouped purposes', async () => {
		await orejimePage.openModalFromBanner();

		const checkbox = orejimePage.purposeCheckbox('contextual');
		await expect(checkbox).not.toBeChecked();

		const checkbox2 = orejimePage.purposeCheckbox('other');
		await expect(checkbox2).not.toBeChecked();

		const groupCheckbox = orejimePage.purposeCheckbox('group');
		await groupCheckbox.check();
		await expect(groupCheckbox).toBeChecked();
		await expect(checkbox).toBeChecked();
		await expect(checkbox2).toBeChecked();

		await checkbox.uncheck();
		await expect(groupCheckbox).not.toBeChecked();
		await expect(groupCheckbox).toHaveJSProperty('indeterminate', true);
		await expect(checkbox).not.toBeChecked();
		await expect(checkbox2).toBeChecked();

		await checkbox2.uncheck();
		await expect(groupCheckbox).not.toBeChecked();
		await expect(checkbox).not.toBeChecked();
		await expect(checkbox2).not.toBeChecked();
	});

	test('should show a contextual consent notice', async () => {
		await expect(orejimePage.contextualNotice).toBeAttached();
	});

	test('should accept contextual consent from the notice', async () => {
		await orejimePage.acceptContextualNotice();
		await expect(orejimePage.locator('#contextual')).toBeVisible();
		await expect(orejimePage.contextualNotice).not.toBeVisible();
		await expect(orejimePage.contextualNoticePlaceholder).toBeAttached();

		await orejimePage.contextualNoticePlaceholder.press('Tab');
		await expect(orejimePage.locator('#contextual')).toBeFocused();

		// This fixes an issue on Firefox, where `focusout`
		// events wouldn't be fired as soon as they should be.
		// The contextual notice relies on those events to
		// remove placeholder elements from the page.
		// This bug is only related to Playwright and does
		// not happen in the browser alone.
		await orejimePage.emptyEventQueue();

		await expect(orejimePage.contextualNoticePlaceholder).not.toBeAttached();
	});

	test('should accept contextual consent from the banner', async () => {
		await orejimePage.acceptAllFromBanner();
		await expect(orejimePage.locator('#contextual')).toBeVisible();
		await expect(orejimePage.contextualNotice).not.toBeVisible();
		await expect(orejimePage.contextualNoticePlaceholder).not.toBeAttached();
	});
});
