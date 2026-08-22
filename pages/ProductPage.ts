import { Page, Locator, expect } from "@playwright/test";

export class ProductPage {
    readonly page: Page;
    readonly addToCartBtn: Locator;
    readonly shoppingCartBtn: Locator;
    readonly checkoutBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.addToCartBtn = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
        this.shoppingCartBtn = page.locator('[data-test="shopping-cart-link"]');
        this.checkoutBtn = page.locator('[data-test="checkout"]');
    }

    async addToCart() {
        await this.addToCartBtn.click();
    }
    async clickShoppingCart() {
        await this.shoppingCartBtn.click();
    }

    async assertCartPageNavigation() {
        await expect(this.page.getByText("Your Cart")).toBeVisible();
    }

    async clickCheckOutBtn() {
        await this.checkoutBtn.click();
    }

}