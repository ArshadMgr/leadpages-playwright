// Import the Playwright test module to define and execute the test case
import { test } from '@playwright/test';
// Import the Page Object Model (POM) class for handling login functionality
import { LoginPage } from '../pages/LoginPage';
// Import the POM class for interacting with the Landing Pages section
import { LandingPagesPage } from '../pages/LandingPagesPage';
// Import test data (email and password) from an external JSON file
import credentials from '../data/testData.json';

// Define a Playwright test named 'Create a new landing page'
test('Create a new landing page', async ({ page }, testInfo) => {
  // Instantiate the LoginPage class with the current browser page which is firefox
  const loginPage = new LoginPage(page);
  // Instantiate the LandingPagesPage class with the same page instance
  const landingPage = new LandingPagesPage(page);

  try {
    // Step 1: Log in to the application using credentials from the JSON file
    await loginPage.login(credentials.email, credentials.password);
     // Step 2: Navigate to the Landing Pages section after login
    await landingPage.navigateToLandingPages();
     // Step 3: Initiate the process to create a new landing page
    await landingPage.createNewLandingPage();
    // Step 4: Select a template for the landing page
    await landingPage.selectTemplate();
    // Step 5: Generate a random name for the new landing page
    const pageName = `LeadpagesTest${Math.floor(Math.random() * 100000)}`;
    // Step 6: Set the name of the landing page and continue
    await landingPage.nameAndContinue(pageName);
  } catch (e) {
    // If any step fails, take a screenshot and save it with the test title
    await page.screenshot({ path: `screenshots/create-page-${testInfo.title}.png`,// Save location and file name
       fullPage: true // Capture the entire page for debugging 
       });   
       // Re-throw the error so the test is marked as failed
    throw e;
  }
});
