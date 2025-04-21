export class PreviewPage {
    constructor(page) {
      this.page = page;
    }
  
    // Clicks the CTA button inside the preview iframe
    async clickCTABtn() {
      
      await this.page.locator('iframe[title="Preview"]').contentFrame().getByRole('link', { name: 'Send Me the Guide!' }).click();
      
    }
  
    // Validates that the popup text is visible and matches the expected content
    async validatePopupText(expectedText) {
      const popupFrame = this.page
        .frameLocator('iframe[title="Preview"]')
        .frameLocator('iframe')
        .frameLocator('iframe.lp-popup__iframe');
  
      const popupText = popupFrame.locator('.lp-text-react', { hasText: expectedText });
  
      await expect(popupText.first()).toBeVisible(); // Assert visibility
      await expect(popupText.first()).toHaveText(expectedText); // Assert correct text
    }
  }
  