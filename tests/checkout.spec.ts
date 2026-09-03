import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductPage } from '../pages/ProductPage';
import { CheckoutPageOverview } from '../pages/CheckoutPageOverview';
import { CheckoutPageYourInformation } from '../pages/CheckoutPageYourInformation';
import users from '../fixtures/users.json';
import { sortAlphabeticallyAsc, sortAlphabeticallyDesc } from "../utils/Helpers";
import invalidCheckoutData from '../fixtures/invalidCheckoutData.json';

test.describe('SauceDemo Checkout Flow', () => {
    // Data-driven testing: Iterate through the users fixture to run the checkout flow 
    // against different user scenarios (e.g., standard_user, problem_user).
    for (const user of users) {
        test(`Standard Checkout (Happy Path) for ${user.scenario}`, async ({ page }) => {
            console.log("running for user: " + user.scenario);

            // Initialize Page Object Models
            const loginPage = new LoginPage(page);
            const productPage = new ProductPage(page);
            const checkoutPageYourInformation = new CheckoutPageYourInformation(page);
            const checkoutPageOverview = new CheckoutPageOverview(page);

            // Step 1: Login
            await loginPage.navigate();
            await loginPage.login(user.username, user.password);
            await loginPage.assertSuccessfulLogin();

            // Step 2: Add product to cart and navigate to checkout
            await productPage.addToCart();
            await productPage.clickShoppingCart();
            await productPage.assertCartPageNavigation();
            await productPage.clickCheckOutBtn();

            // Step 3: Fill in customer information
            await checkoutPageYourInformation.fillYourInformation('Sayuz', 'Shikhrakar', 'NTY21');
            await checkoutPageYourInformation.clickContinue();
            await checkoutPageYourInformation.assertOverviewPageNavigation();

            // Step 4: Complete the order
            await checkoutPageOverview.clickFinish();
            await checkoutPageOverview.assertThankYouPageNavigation();



        });

        test(`Cart retains items after page refresh @regression for ${user.scenario}`, async ({ page }) => {
            const loginPage = new LoginPage(page);
            const productPage = new ProductPage(page);

            // Add an item to the cart
            await loginPage.navigate();
            await loginPage.login(user.username, user.password);
            await productPage.addToCart();

            // Refresh the browser page to test state persistence
            await page.reload();

            // Assert that the cart state is retained after refresh
            await expect(productPage.cartCount).toHaveText("1");
            await expect(productPage.removeBtn).toBeVisible();


        })
    }

    test('when logging out, user successfully logs out @regression', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const productPage = new ProductPage(page);

        // Find the specific 'Standard User' from the JSON fixture to use for this test
        const standardUser = users.find(u => u.scenario === 'Standard User');
        if (!standardUser) throw new Error("Standard User not found in fixture!");

        // Login as the standard user
        await loginPage.navigate();
        await loginPage.login(standardUser.username, standardUser.password);

        // Open the hamburger menu and logout
        await productPage.clickBurgerIcon();
        await productPage.clickLogoutBtn();
    });

    test('Verify the product sorting functionality @building', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const productPage = new ProductPage(page);


        // Setup: Find standard user and login
        const standardUser = users.find(u => u.scenario === 'Standard User');
        if (!standardUser) throw new Error("Standard User not found in fixture!");

        await loginPage.navigate();
        await loginPage.login(standardUser.username, standardUser.password);

        //get initia product title
        const initialProductList = await productPage.getProductTitles();
        // --- Verify Ascending Order ---
        // 1. Sort products A-Z via the web UI drop-down
        const productListAsc = await productPage.sortByProductNameAsc();

        // 2. Read the locally cached list, sort it A-Z using JavaScript, and compare against the UI
        const initialProducToAsc = await sortAlphabeticallyAsc(initialProductList);
        expect(productListAsc).toEqual(initialProducToAsc);

        // --- Verify Descending Order ---
        // 1. Sort products Z-A via the web UI drop-down
        const productListDesc = await productPage.sortByProductnameDesc();

        // 2. Read the locally cached list, sort it Z-A using JavaScript, and compare against the UI
        const initialProducToDesc = await sortAlphabeticallyDesc(initialProductList);
        expect(productListDesc).toEqual(initialProducToDesc);



    })

    for (const invData of invalidCheckoutData) {
        test(`Checkout with invalid data ${invData.scenario} @building`, async ({ page }) => {
            const loginPage = new LoginPage(page);
            const productPage = new ProductPage(page);
            const checkoutPageYourInformation = new CheckoutPageYourInformation(page);

            const standardUser = users.find(u => u.scenario === "Standard User");
            if (!standardUser) throw new Error("Standard User not found in fixture!");

            // Step 1: Login
            await loginPage.navigate();
            await loginPage.login(standardUser.username, standardUser.password);
            await loginPage.assertSuccessfulLogin();


            //add to cart
            // Step 2: Add product to cart and navigate to checkout
            await productPage.addToCart();
            await productPage.clickShoppingCart();
            await productPage.assertCartPageNavigation();
            await productPage.clickCheckOutBtn();

            //fill the invalid data
            // Step 3: Fill in customer information
            await checkoutPageYourInformation.fillYourInformation(invData.firstName, invData.lastName, invData.zipCode);
            await checkoutPageYourInformation.clickContinue();
            const errMessage = invData.expectedError;
            console.log("errmessage", errMessage);


            // Step 4: Complete the order
            await expect(checkoutPageYourInformation.invalidDataBtn).toHaveText(errMessage);


        })
    }
});
