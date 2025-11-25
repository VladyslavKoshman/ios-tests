// screens/SharingScreen.js
import BaseScreen from './BaseScreen.js';

export default class SharingScreen extends BaseScreen {
  // Нижняя вкладка "Sharing"
  get sharingTab() {
    // <XCUIElementTypeButton name="Sharing" .../>
    return this.driver.$('~Sharing');
  }

  // Иконка поиска в правом верхнем углу
  get searchIcon() {
    // <XCUIElementTypeImage name="newSearch" .../>
    return this.driver.$('~newSearch');
  }

  // Кнопки пользователей в блоке "SHARED USERS"
  // name="..., Last flight XXd ago"
  async sharedUserButtons() {
    return this.driver.$$(
      "//XCUIElementTypeButton[contains(@name, 'Last flight')]"
    );
  }

  // Открыть вкладку Sharing через нижний таб-бар
  async openSharing() {
    await this.click(this.sharingTab);
  }

  // Поиск пользователя по имени (пока максимально безопасный, без падений)
  async findUserByName(name) {
    await this.openSharing();

    // Пробуем нажать на иконку поиска
    try {
      await this.click(this.searchIcon);
      await this.driver.pause(500);
    } catch (e) {
      console.log('findUserByName: searchIcon не найден, пропускаем поиск');
      return;
    }

    // На текущем XML поля ввода нет — пробуем угадать его по типу
    const candidates = await this.driver.$$(
      '//XCUIElementTypeSearchField | //XCUIElementTypeTextField'
    );

    if (candidates.length === 0) {
      console.log('findUserByName: search field не найден на экране');
      return;
    }

    const field = candidates[0];
    try {
      await field.clearValue();
    } catch (_) {
      // если clearValue не умеет — просто затираем setValue
    }
    await field.setValue(name);
    await this.driver.pause(500);
  }

  // Открыть по очереди карточку каждого юзера и вернуться назад
  async openEachUserStatsAndBack() {
    await this.openSharing();

    const buttons = await this.sharedUserButtons();
    const count = buttons.length;
    console.log(`openEachUserStatsAndBack: найдено ${count} пользователей`);

    // важный момент: после переходов старые элементы могут стать "stale",
    // поэтому в цикле берём элемент каждый раз по XPath с индексом
    for (let i = 1; i <= count; i++) {
      const btn = await this.driver.$(
        `(//XCUIElementTypeButton[contains(@name, 'Last flight')])[${i}]`
      );

      try {
        await btn.click();
        await this.driver.pause(700);
      } catch (e) {
        console.log(`openEachUserStatsAndBack: не смогли открыть пользователя #${i}`);
      }

      // Возвращаемся назад через таб "Sharing" (он есть и на списке, и, скорее всего, на деталях)
      try {
        await this.click(this.sharingTab);
        await this.driver.pause(500);
      } catch (e) {
        console.log('openEachUserStatsAndBack: не смогли нажать sharingTab для возврата');
      }
    }

    return count;
  }
}
