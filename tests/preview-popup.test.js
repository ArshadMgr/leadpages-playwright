// Import Playwright's test module to define and execute automated tests
import { test } from '@playwright/test';
// Import Page Object classes for handling different sections of the app
import { LoginPage } from '../pages/LoginPage';
import { LandingPagesPage } from '../pages/LandingPagesPage';
import { EditorPage } from '../pages/EditorPage';
import { PreviewPage } from '../pages/PreviewPage';
// Import login credentials from external test data JSON
import credentials from '../data/testData.json';

// Define a test case for previewing and validating popup content in a landing page
test('Preview and validate popup content in landing page', async ({ page }, testInfo) => {

  // Instantiate page objects using the shared browser page
  const loginPage = new LoginPage(page);
  const landingPage = new LandingPagesPage(page);
  const editorPage = new EditorPage(page);
  const previewPage = new PreviewPage(page);
  // Text that will be entered in the popup
  const popupText = 'Enter Your Email to Get Your Free Guide';
  // Generate a unique page name to avoid naming conflicts
  const pageName = `LeadpagesTest${Math.floor(Math.random() * 100000)}`;

  try {
    // Step 1: Log in to the application with provided credentials
    await loginPage.login(credentials.email, credentials.password);
    // Step 2: Navigate to the landing pages dashboard
    await landingPage.navigateToLandingPages();
    // Step 3: Start creating a new landing page
    await landingPage.createNewLandingPage();
    // Step 4: Select a page template from available options
    await landingPage.selectTemplate();
     // Step 5: Provide a unique name for the new landing page
    await landingPage.nameAndContinue(pageName);
    // Step 6: Edit the popup content within the landing page editor
    await editorPage.editPopupContent(popupText);
    // Step 7: Apply bold formatting to the popup content
    await editorPage.applyBold();
    // Step 8: Close the popup editor
    await editorPage.closePopupEditor();
    // Step 9: Open the landing page in preview mode
    await editorPage.preview();
    // Step 10: In preview, click the Call-To-Action button that triggers the popup
    await previewPage.clickCTABtn();
    // Step 11: validate that the popup contains the correct text, Note, here test fails because of 404 bug
    await previewPage.validatePopupText(popupText);
    await page.waitForTimeout(3000);
  } catch (e) {
    await page.screenshot({ path: `screenshots/preview-popup-${testInfo.title}.png`, fullPage: true });
    throw e;
  }
});
