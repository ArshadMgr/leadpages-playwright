import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import credentials from '../data/testData.json';

test('Login to Leadpages', async ({ page }, testInfo) => {
  const loginPage = new LoginPage(page);
  try {
    await loginPage.login(credentials.email, credentials.password);
  } catch (e) {
    await page.screenshot({ path: `screenshots/login-${testInfo.title}.png`, fullPage: true });
    throw e;
  }
});
