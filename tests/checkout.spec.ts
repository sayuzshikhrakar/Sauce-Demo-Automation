import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductPage } from '../pages/ProductPage';
import { CheckoutPageOverview } from '../pages/CheckoutPageOverview';
import { CheckoutPageYourInformation } from '../pages/CheckoutPageYourInformation';
import users from '../fixtures/users.json';

test.describe('SauceDemo Checkout Flow', () => {
    for (const user of users) {
        test(`Standard Checkout (Happy Path) for ${user.scenario}`, async ({ page }) => {
            console.log("running for user: " + user.scenario);
            const loginPage = new LoginPage(page);
            const productPage = new ProductPage(page);
            const checkoutPageYourInformation = new CheckoutPageYourInformation(page);
            const checkoutPageOverview = new CheckoutPageOverview(page);

            await loginPage.navigate();
            await loginPage.login(user.username, user.password);
            await loginPage.assertSuccessfulLogin();

            await productPage.addToCart();
            await productPage.clickShoppingCart();
            await productPage.assertCartPageNavigation();
            await productPage.clickCheckOutBtn();

            await checkoutPageYourInformation.fillYourInformation('Sayuz', 'Shikhrakar', 'NTY21');
            await checkoutPageYourInformation.clickContinue();
            await checkoutPageYourInformation.assertOverviewPageNavigation();

            await checkoutPageOverview.clickFinish();
            await checkoutPageOverview.assertThankYouPageNavigation();



        });
    }

});
