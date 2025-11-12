import BaseScreen from './BaseScreen.js';

export default class SharingScreen extends BaseScreen {
  // В Java-кусочке findUser локаторы были пустые — ставлю явные TODO,
  // чтобы ты позже подставил актуальные accessibilityId/xpath.
  get searchOpenButton() {
    return this.driver.$('REPLACE_ME_open_search_btn'); // TODO
  }
  get searchField() {
    return this.driver.$('REPLACE_ME_search_textfield'); // TODO
  }
  get searchSubmitButton() {
    return this.driver.$('REPLACE_ME_search_submit'); // (если нужен) TODO
  }

  async userStatButtons() {
    return this.driver.$$("//XCUIElementTypeButton[contains(@name, 'Total flown')]");
  }
  get backChevron() {
    return this.driver.$('//XCUIElementTypeButton[@name="chevron.left"]');
  }

  async findUserByName(name) {
    await this.click(this.searchOpenButton);
    await this.type(this.searchField, name);
    try { await this.click(this.searchSubmitButton); } catch (_) {}
  }

  async openEachUserStatsAndBack() {
    const buttons = await this.userStatButtons();
    for (const btn of buttons) {
      await btn.click();
      await this.backChevron.click();
    }
    return buttons.length;
  }
}
