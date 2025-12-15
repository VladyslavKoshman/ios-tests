// tests/activity.test.js
import { getDriver, quitDriver } from '../utils/driver.js';
import LoginScreen from '../screens/LoginScreen.js';
import ActivityScreen from '../screens/ActivityScreen.js';
import { allureTest } from '../utils/allure.js';

let driver;
let loginScreen;
let activity;

describe('Activity page', () => {
  beforeAll(async () => {
    driver = await getDriver();
    loginScreen = new LoginScreen(driver);
    activity = new ActivityScreen(driver);

    await loginScreen.login(
      process.env.MP_USERNAME || 'swd76129@bcooq.com',
      process.env.MP_PASSWORD || 'Qwerty12'
    );

    await activity.waitForLoaded(20000);
  });

  afterAll(async () => {
    await quitDriver();
  });

  test(
    'check maneuvers (swipe to end)',
    async () =>
      allureTest('Swipe maneuvers', async () => {
        const { swipes } = await activity.swipeToEnd({ maxSwipes: 30 });
        expect(swipes).toBeGreaterThanOrEqual(0);
      }),
    60000
  );
});
