import { Page, Locator, expect } from "@playwright/test";

export class CheckoutPageOverview {
    readonly page: Page;
    readonly finishBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.finishBtn = page.locator('[data-test="finish"]');
    }

    async clickFinish() {
        await this.finishBtn.click();
    }

    async assertThankYouPageNavigation() {
        await expect(this.page.getByText("Thank you for your order!")).toBeVisible();
    }
}