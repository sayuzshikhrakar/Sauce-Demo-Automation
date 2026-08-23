import { Page, Locator, expect } from "@playwright/test";

export class ProductPage {
    readonly page: Page;
    readonly addToCartBtn: Locator;
    readonly shoppingCartBtn: Locator;
    readonly checkoutBtn: Locator;
    readonly cartCount: Locator;
    readonly removeBtn: Locator;
    readonly logoutBtn: Locator;
    readonly burgerIcon: Locator;
    readonly productList: Locator;
    readonly productSorting: Locator;

    constructor(page: Page) {
        this.page = page;
        this.addToCartBtn = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
        this.shoppingCartBtn = page.locator('[data-test="shopping-cart-link"]');
        this.checkoutBtn = page.locator('[data-test="checkout"]');
        this.cartCount = page.locator('[data-test="shopping-cart-badge"]');
        this.removeBtn = page.locator('[data-test="remove-sauce-labs-backpack"]');
        this.logoutBtn = page.locator('[data-test="logout-sidebar-link"]');
        this.burgerIcon = page.locator('#react-burger-menu-btn');
        this.productList = page.locator('[data-test="inventory-item-name"]');
        this.productSorting = page.locator('[data-test="product-sort-container"]');
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

    async clickBurgerIcon() {
        await this.burgerIcon.click();
    }

    async clickLogoutBtn() {
        await this.logoutBtn.click();
        await expect(this.page.getByText("Swag Labs")).toBeVisible();
    }

    async getProductTitles() {
        return await this.productList.allTextContents();

    }
    async sortByProductNameAsc() {
        await this.productSorting.selectOption('az');
        return await this.productList.allTextContents();

    }

    async sortByProductnameDesc() {
        await this.productSorting.selectOption('za');
        return await this.productList.allTextContents();


    }


}