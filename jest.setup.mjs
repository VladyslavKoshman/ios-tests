import { jest } from '@jest/globals';
import { createRequire } from 'module';
import { getDriver } from './utils/driver.js';

const require = createRequire(import.meta.url);
require('allure-jest');

afterEach(async () => {
  const state = expect.getState();
  const failed =
    state.currentTestName &&
    state.currentTestResults?.status === 'failed';

  if (failed) {
    try {
      const driver = await getDriver();
      const screenshot = await driver.takeScreenshot();

      await allure.attachment(
        'Failure screenshot',
        Buffer.from(screenshot, 'base64'),
        'image/png'
      );
    } catch (e) {
      console.warn('Allure screenshot failed:', e.message);
    }
  }
});
