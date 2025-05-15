import { test, expect } from '../fixtures/pageFixtures';
import * as allure from 'allure-js-commons';


test.describe(
  'Attempting login with different fields',
  { tag: '@login' },
  () => {
    const validUsername = 'tomsmith';
    const invalidPassword = 'invalidPassword';

    test(
      'should navigate to the login page from the Home page @login ',
      { tag: ['@smoke'] },
      async ({ homePage, loginPage }) => {
        await allure.description("This test checks that we are navigated correctly to the login page")
        allure.owner("Busayo Samuel")
        allure.tags("authentication","login")
        await homePage.goto();
        await homePage.clickFormAuthenticationLink();
        //assert that we were nagivated to login
        await loginPage.expectOnLoginPage();
      }
    );

    test(
      'should login successfully with valid credentials',
      { tag: ['@critical', '@smoke'] },
      async ({ loggedInPage }) => {
        allure.description("This test checks that we are able to login successfully with valid credentials")
        const messageText = await loggedInPage.getSuccessMessageText();
        expect(messageText).toContain('You logged into a secure area!');
        await loggedInPage.clickLogoutButton();
      }
    );

    test(
      'should show error message with invalid credentials',
      { tag: '@regression' },
      async ({ loginPage, secureAreaPage }) => {
        allure.description("This test checks that we are able to show error message with invalid credentials")
        await loginPage.goto();
        await loginPage.login(validUsername, invalidPassword);
        const messageText = await secureAreaPage.getSuccessMessageText();
        expect(messageText).toContain('Your password is invalid!');
      }
    );

    test(
      'should logout successfully',
      { tag: '@regression' },
      async ({ loggedInPage, loginPage }) => {
        allure.description("This test checks that we are able to logout successfully")
        // logout
        await loggedInPage.clickLogoutButton();
        // assert
        await loginPage.expectOnLoginPage();
        const messageText = await loginPage.getFlashMessageText();
        expect(messageText).toContain('You logged out of the secure area!');
      }
    );
  }
);
