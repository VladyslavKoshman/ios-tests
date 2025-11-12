import BaseScreen from './BaseScreen.js';

export default class ActivityScreen extends BaseScreen {
  get maneuversImageXpath() {
    return '**/XCUIElementTypeWindow/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeScrollView/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeImage';
  }

  async swipe(direction = 'up') {
    await this.driver.execute('mobile: swipe', { direction });
  }

  async swipeToEnd({ maxSwipes = 30, pauseMs = 100 } = {}) {
    let lastPageSource = '';
    for (let i = 0; i < maxSwipes; i++) {
      const current = await this.driver.getPageSource();
      if (current === lastPageSource) {
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

  async countAllImagesSimple() {
    const els = await this.driver.$$('//XCUIElementTypeImage');
    return els.length;
  }

  async countManeuverImagesPrecise() {
    const els = await this.driver.$$(this.maneuversImageXpath);
    return els.length;
  }
}
