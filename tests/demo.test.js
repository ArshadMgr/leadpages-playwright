import { test, expect } from '@playwright/test';


// This is for testing, that's why all code is in one page. "leadpages.test.js" file follows the page object pattern


test('Demo_Test', async ({ page }) => {

  // Step 1: Login
  await page.goto('https://my.leadpagestest.com/');
  await page.getByRole('textbox', { name: 'Email Address' }).click();
  await page.getByRole('textbox', { name: 'Email Address' }).fill('uforia.logic@leadpages.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Leadpages123!');
  await page.getByRole('button', { name: 'Log in' }).click();



  // Step 2: Navigate to Landing Pages
  await page.waitForSelector('text=Landing Pages', { timeout: 70000 });
  await page.getByRole('link', { name: 'Landing Pages' }).click();

  // Step 3: Click "CREATE NEW LANDING PAGE"
  await page.getByRole('link', { name: 'Create New Landing Page' }).click();

  


  // Step 4: Find "Buster Business" template
  
page.goto("https://pages.leadpagestest.com/#/new/6LqpzgykC5VE3NB2NTA9jR")
  

   
  // Step 5: Enter name and continue
  await page.getByRole('textbox', { name: 'Page Name', timeout: 70000 }).click();
  const randomNumber = Math.floor(Math.random() * 100000); // generates a number between 0 and 99999
  await page.getByRole('textbox', { name: 'Page Name' }).fill(`LeadpagesTest${randomNumber}`);
  await page.getByRole('button', { name: 'Continue' },{ timeout: 900000 }).click();

  
  
  // Step 6: Hover over button and click "EDIT POP-UP"
  await page.getByText('Send Me the Guide!', { exact: false }).hover();
  await page.getByText('EDIT POP-UP').click();
  await page.getByText('Enter Your Email to Get Your Free Business Guide', { exact: false }).hover();
  await page.getByText('Enter Your Email to Get Your Free Business Guide').click()
  await page.getByText('Enter Your Email to Get Your Free Business Guide').press('Control+A')
  await page.getByText('Enter Your Email to Get Your Free Business Guide').click()
 // Focus the ProseMirror contenteditable area directly
  const editor = page.locator('.ProseMirror');
  await editor.click();

  // Select all existing content
  await page.keyboard.press('Control+A');

  // Delete it
  await page.keyboard.press('Backspace');

  // Type new content
  await editor.type('Enter Your Email to Get Your Free Guide');
  

  await page.getByRole('button', { name: 'Bold' }).click();
  await page.getByText('Enter Your Email to Get Your Free Guide').press('Control+A')
  await page.waitForTimeout(5000)
  await page.getByRole('button', { name: 'Bold' }).click();
  await page.waitForTimeout(5000)

  await page.getByRole('button', { name: 'Close', exact: true }).click();

  // Step 9: Click Preview
  await page.getByRole('button', { name: 'Preview check error' } ).click();

  await page.waitForTimeout(10000)

  // Step 10: Wait for preview and click SEND ME THE GUIDE
  await page.locator('iframe[title="Preview"]').contentFrame().getByRole('link', { name: 'Send Me the Guide!' }).click();
 

  /*
 // Assert the popup text is correct
const popupText = page
.frameLocator('iframe.lp-popup__iframe') // or remove this if not in iframe
.locator('.lp-text-react', {
  hasText: 'Enter Your Email to Get Your Free Guide'
});

await expect(popupText.first()).toBeVisible();
await expect(popupText.first()).toHaveText('Enter Your Email to Get Your Free Guide');
*/
  await page.waitForTimeout(5000)
 




});
