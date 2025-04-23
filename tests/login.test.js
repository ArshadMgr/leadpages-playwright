
// Import the Playwright test module to define and run test cases
import { test } from '@playwright/test';
// Import the LoginPage class which encapsulates the logic for interacting with the login page
import { LoginPage } from '../pages/LoginPage';
// Import test credentials (email and password) from an external JSON file
import credentials from '../data/testData.json';

// Define a Playwright test named 'Login to Leadpages'
test('Login to Leadpages', async ({ page }, testInfo) => {

  // Create an instance of the LoginPage class, passing the current browser page to it
  const loginPage = new LoginPage(page);
  try {
    // Attempt to perform login using the email and password from the JSON file
    await loginPage.login(credentials.email, credentials.password);
  } catch (e) {
    // If the login fails, capture a full-page screenshot with the test title in the filename
    await page.screenshot({ path: `screenshots/login-${testInfo.title}.png`, // Screenshot will be saved in the 'screenshots' folder
      
      fullPage: true });// Capture the entire page, not just the visible viewport

      // Re-throw the caught error to ensure the test is marked as failed in the report
    throw e;
  }
});
