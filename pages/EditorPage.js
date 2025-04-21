export class EditorPage {
  constructor(page) {
    this.page = page;
    this.editor = page.locator('.ProseMirror');
  }

  // Edits the text of the popup using the ProseMirror editor
  async editPopupContent(newText) {
    await this.page.getByText('Send Me the Guide!', { exact: false }).hover();
    await this.page.getByText('EDIT POP-UP').click();
    await this.page.getByText('Enter Your Email to Get Your Free Business Guide', { exact: false }).click();

    await this.editor.click();
    await this.page.keyboard.press('Control+A'); // Select all text
    await this.page.keyboard.press('Backspace'); // Delete selected text
    await this.editor.type(newText); // Type new content
  }

  // Applies bold formatting to the edited text
  async applyBold() {
    await this.page.getByRole('button', { name: 'Bold' }).click();
    await this.page.waitForTimeout(1000); // Give it a moment to apply formatting
  }

  // Closes the popup text editor
  async closePopupEditor() {
    await this.page.getByRole('button', { name: 'Close', exact: true }).click();
  }

  // Opens the preview mode of the landing page
  async preview() {
    await this.page.getByRole('button', { name: 'Preview check error' }).click();
    await this.page.waitForTimeout(10000); // Wait for preview to load
  }
}
