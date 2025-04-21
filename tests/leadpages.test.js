import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { LandingPagesPage } from '../pages/LandingPagesPage';
import { EditorPage } from '../pages/EditorPage';
import { PreviewPage } from '../pages/PreviewPage';
import credentials  from '../data/testData.json';

test('Leadpages: Create and Validate Landing Page Popup', async ({ page }) => {
  // Initialize page objects
  const loginPage = new LoginPage(page);
  const landingPage = new LandingPagesPage(page);
  const editorPage = new EditorPage(page);
  const previewPage = new PreviewPage(page);

  // Test data

  const randomNumber = Math.floor(Math.random() * 100000);
  const pageName = `LeadpagesTest${randomNumber}`;
  const popupText = 'Enter Your Email to Get Your Free Guide';

  // Login using JSON data
  await loginPage.login(credentials.email, credentials.password);

  // Navigate to Landing Pages and start page creation
  await landingPage.navigateToLandingPages();
  await landingPage.createNewLandingPage();
  await landingPage.selectTemplate();
  await landingPage.nameAndContinue(pageName);

  // Edit content in popup and apply formatting
  await editorPage.editPopupContent(popupText);
  await editorPage.applyBold();
  await editorPage.closePopupEditor();
  await editorPage.preview();

  
  // Interact with preview and validate popup content
  await previewPage.clickCTABtn();

  await previewPage.validatePopupText(popupText);


  // Optional: wait to observe result
  await page.waitForTimeout(5000);
});
