import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { LandingPagesPage } from '../pages/LandingPagesPage';
import credentials from '../data/testData.json';

test('Create a new landing page', async ({ page }, testInfo) => {
  const loginPage = new LoginPage(page);
  const landingPage = new LandingPagesPage(page);

  try {
    await loginPage.login(credentials.email, credentials.password);
    await landingPage.navigateToLandingPages();
    await landingPage.createNewLandingPage();
    await landingPage.selectTemplate();

    const pageName = `LeadpagesTest${Math.floor(Math.random() * 100000)}`;
    await landingPage.nameAndContinue(pageName);
  } catch (e) {
    await page.screenshot({ path: `screenshots/create-page-${testInfo.title}.png`, fullPage: true });
    throw e;
  }
});
