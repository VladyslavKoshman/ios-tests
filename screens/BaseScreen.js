export default class BaseScreen {
  constructor(driver) {
    this.driver = driver;
  }

  async click(element) {
    await element.waitForDisplayed({ timeout: 10000 });
    await element.click();
  }

  async type(element, text) {
    await element.waitForDisplayed({ timeout: 10000 });
    await element.setValue(text);
  }

  async getText(element) {
    await element.waitForDisplayed({ timeout: 10000 });
    return element.getText();
  }
}
