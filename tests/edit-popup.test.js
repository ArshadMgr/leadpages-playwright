
// Import Playwright's test module to define and execute the test
import { test } from '@playwright/test';
// Import the Page Object class for handling login operations
import { LoginPage } from '../pages/LoginPage';
// Import the Page Object class for interacting with the Landing Pages section
import { LandingPagesPage } from '../pages/LandingPagesPage';
// Import the Page Object class for editing content within the landing page editor
import { EditorPage } from '../pages/EditorPage';
// Import test credentials (email and password) from an external JSON file
import credentials from '../data/testData.json';

// Define a Playwright test named 'Edit popup content in landing page'
test('Edit popup content in landing page', async ({ page }, testInfo) => {
  // Instantiate the LoginPage, LandingPagesPage, and EditorPage with the browser page
  const loginPage = new LoginPage(page);
  const landingPage = new LandingPagesPage(page);
  const editorPage = new EditorPage(page);

  // Define the content to be inserted into the popup editor
  const popupText = 'Enter Your Email to Get Your Free Guide';
  // Generate a unique name for the new landing page to avoid naming conflicts
  const pageName = `LeadpagesTest${Math.floor(Math.random() * 100000)}`;

  try {
    // Step 1: Log into the Leadpages application
    await loginPage.login(credentials.email, credentials.password);
    // Step 2: Navigate to the Landing Pages dashboard
    await landingPage.navigateToLandingPages();
    // Step 3: Begin the process of creating a new landing page
    await landingPage.createNewLandingPage();
     // Step 4: Select a template for the new landing page
    await landingPage.selectTemplate();
    // Step 5: Set a unique name for the landing page and continue
    await landingPage.nameAndContinue(pageName);
    // Step 6: Edit the popup content using the defined popup text
    await editorPage.editPopupContent(popupText);
    // Step 7: Apply bold formatting to the popup text
    await editorPage.applyBold();
    // Step 8: Close the popup editor after editing is complete
    await editorPage.closePopupEditor();
  } catch (e) {
    // If an error occurs during any of the steps, capture a full-page screenshot for debugging
    await page.screenshot({ path: `screenshots/edit-popup-${testInfo.title}.png`, fullPage: true });
    throw e;
  }
});
