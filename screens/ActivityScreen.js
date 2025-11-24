// screens/ActivityScreen.js
import BaseScreen from './BaseScreen.js';

export default class ActivityScreen extends BaseScreen {
  constructor(driver) {
    super(driver);
    this.driver = driver;
  }

  // Заголовок экрана "My Activity" — главный маркер, что мы на Activity page
  get myActivityTitle() {
    // accessibility id = name/label "My Activity"
    return this.driver.$('~My Activity');
  }

  // Вкладки сверху: Flights / Maneuvers
  get flightsTab() {
    return this.driver.$('~Flights');
  }

  get maneuversTab() {
    return this.driver.$('~Maneuvers');
  }

  // Более адекватный XPath для картинок в списке (фото/карточки полётов/манёвров)
  // Если нужно будет ужать именно до манёвров — сузим дальше.
  get maneuversImageXpath() {
    return '//XCUIElementTypeScrollView//XCUIElementTypeImage';
  }

  async waitForLoaded(timeout = 10000) {
    const title = await this.myActivityTitle;
    await title.waitForDisplayed({ timeout });
  }

  async swipe(direction = 'up') {
    await this.driver.execute('mobile: swipe', { direction });
  }

  /**
   * Скроллим до конца списка (Flights/Maneuvers),
   * логируем количество картинок на каждом шаге.
   */
  async swipeToEnd({ maxSwipes = 30, pauseMs = 100 } = {}) {
    let lastPageSource = '';
    for (let i = 0; i < maxSwipes; i++) {
      const current = await this.driver.getPageSource();
      if (current === lastPageSource) {
        // экран больше не меняется — считаем, что дошли до конца
        return { reachedEnd: true, swipes: i };
      }

      await this.swipe('up');
      lastPageSource = current;
      await this.driver.pause(pauseMs);

      const elements = await this.driver.$$(this.maneuversImageXpath);
      console.log('[Activity] images on step', i, '=>', elements.length);
    }
    return { reachedEnd: false, swipes: maxSwipes };
  }

  // Просто все картинки на экране (включая иконки)
  async countAllImagesSimple() {
    const els = await this.driver.$$('//XCUIElementTypeImage');
    return els.length;
  }

  // Более «точный» счётчик — только картинки из ScrollView (список полётов/манёвров)
  async countManeuverImagesPrecise() {
    const els = await this.driver.$$(this.maneuversImageXpath);
    return els.length;
  }
}
