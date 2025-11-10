export default class BaseScreen {
  constructor(driver) {
    this.driver = driver;
  }

  async click(element) {
    await element.waitForDisplayed();
    await element.click();
  }

  async type(element, text) {
    await element.waitForDisplayed();
    await element.setValue(text);
  }

  async getText(element) {
    await element.waitForDisplayed();
    return element.getText();
  }
}
