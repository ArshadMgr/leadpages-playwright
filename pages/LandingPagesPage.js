export class LandingPagesPage {
  constructor(page) {
    this.page = page;
  }

  // Navigates to the 'Landing Pages' section after login
  async navigateToLandingPages() {
    await this.page.waitForSelector('text=Landing Pages', { timeout: 70000 });
    await this.page.getByRole('link', { name: 'Landing Pages' }).click();
  }

  // Clicks "Create New Landing Page"
  async createNewLandingPage() {
    await this.page.getByRole('link', { name: 'Create New Landing Page' }).click();
  }

  // Navigates directly to the specific "Buster Business" template URL
  async selectTemplate() {
    await this.page.goto('https://pages.leadpagestest.com/#/new/6LqpzgykC5VE3NB2NTA9jR');
  }

  // Enters a page name and clicks Continue
  async nameAndContinue(name) {
    await this.page.getByRole('textbox', { name: 'Page Name', timeout: 70000 }).fill(name);
    await this.page.getByRole('button', { name: 'Continue' }).click();
  }
}
