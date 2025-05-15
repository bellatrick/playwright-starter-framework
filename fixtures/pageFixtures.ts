import { APIRequestContext, test as baseTest } from '@playwright/test';
import { HomePage } from '../pages/Homepage';
import { LoginPage } from '../pages/LoginPage';
import { SecureAreaPage } from '../pages/SecureArea';
import { PostsAPI } from '../apiTests/jsonplaceholder/postsApi';
import appConfig from '../config/customEnvironment';

const validUsername = 'tomsmith';
const validPassword = 'SuperSecretPassword!';

type MyFixures = {
  homePage: HomePage;
  loginPage: LoginPage;
  secureAreaPage: SecureAreaPage;
  loggedInPage: SecureAreaPage;
  postsAPI: PostsAPI;
  apiRequestContext: APIRequestContext;
};

export const test = baseTest.extend<MyFixures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  secureAreaPage: async ({ page }, use) => {
    await use(new SecureAreaPage(page));
  },
  loggedInPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(validUsername, validPassword);

    const secureAreaPage = new SecureAreaPage(page);
    await secureAreaPage.expectOnSecureAreaPage(10000);

    await use(new SecureAreaPage(page));
  },
  apiRequestContext: async ({ playwright }, use) => {
    const requestContext: APIRequestContext =
    await playwright.request.newContext({
      baseURL: appConfig.apiBaseUrl
    });
    await use(requestContext);
    await requestContext.dispose();
  },
  postsAPI: async ({ apiRequestContext }, use) => {
    await use(new PostsAPI(apiRequestContext));
  }
});

export { expect } from '@playwright/test';
