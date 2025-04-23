import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { LandingPagesPage } from '../pages/LandingPagesPage';
import { EditorPage } from '../pages/EditorPage';
import credentials from '../data/testData.json';

test('Edit popup content in landing page', async ({ page }, testInfo) => {
  const loginPage = new LoginPage(page);
  const landingPage = new LandingPagesPage(page);
  const editorPage = new EditorPage(page);

  const popupText = 'Enter Your Email to Get Your Free Guide';
  const pageName = `LeadpagesTest${Math.floor(Math.random() * 100000)}`;

  try {
    await loginPage.login(credentials.email, credentials.password);
    await landingPage.navigateToLandingPages();
    await landingPage.createNewLandingPage();
    await landingPage.selectTemplate();
    await landingPage.nameAndContinue(pageName);

    await editorPage.editPopupContent(popupText);
    await editorPage.applyBold();
    await editorPage.closePopupEditor();
  } catch (e) {
    await page.screenshot({ path: `screenshots/edit-popup-${testInfo.title}.png`, fullPage: true });
    throw e;
  }
});
