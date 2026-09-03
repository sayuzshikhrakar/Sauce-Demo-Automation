import { Page, Locator, expect } from "@playwright/test";

export class CheckoutPageYourInformation {
    readonly page: Page;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly zip: Locator;
    readonly continueBtn: Locator;
    readonly invalidDataBtn: Locator;


    constructor(page: Page) {
        this.page = page;
        this.firstName = page.getByRole('textbox', { name: 'First Name' });
        this.lastName = page.getByRole('textbox', { name: 'Last Name' });
        this.zip = page.getByRole('textbox', { name: 'Zip/Postal Code' });
        this.continueBtn = page.locator('[data-test="continue"]');
        this.invalidDataBtn = page.locator('h3[data-test="error"]');

    }

    async fillYourInformation(firstName: string, lastName: string, Zip: string) {
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.zip.fill(Zip);

    }

    async clickContinue() {
        await this.continueBtn.click();
    }

    async assertOverviewPageNavigation() {
        await expect(this.page.getByText("Checkout: Overview")).toBeVisible();
    }



}
