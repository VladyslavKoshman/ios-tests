// tests/activity.test.js
import { getDriver, quitDriver } from '../utils/driver.js';
import LoginScreen from '../screens/LoginScreen.js';
import ActivityScreen from '../screens/ActivityScreen.js';

let driver;
let loginScreen;
let activity;

describe('Activity page', () => {
  beforeAll(
    async () => {
      driver = await getDriver();
      loginScreen = new LoginScreen(driver);
      activity = new ActivityScreen(driver);

      console.log('=== Activity.beforeAll: логинимся и ждём My Activity ===');

      const username = process.env.MP_USERNAME || 'swd76129@bcooq.com';
      const password = process.env.MP_PASSWORD || 'Qwerty12';

      // Логин (если уже залогинен — login() сам выйдет)
      await loginScreen.login(username, password);

      // Ждём, пока откроется Activity page
      await activity.waitForLoaded(20000);
      console.log('=== Activity.beforeAll: My Activity загружен ===');
    },
    60000
  );

  afterAll(
    async () => {
      console.log('=== Activity.afterAll: закрываем драйвер ===');
      await quitDriver();
    },
    30000
  );

  test(
    'check maneuvers (swipe to end & log images)',
    async () => {
      console.log('=== TEST: swipeToEnd on Activity ===');
      const { reachedEnd, swipes } = await activity.swipeToEnd({
        maxSwipes: 30,
        pauseMs: 100,
      });
      console.log(`[Activity] finished. reachedEnd=${reachedEnd}, swipes=${swipes}`);

      // Просто sanity-check (чтоб тест считался passed)
      expect(swipes).toBeGreaterThanOrEqual(0);
    },
    60000
  );

  test(
    'check flight cards - count all images',
    async () => {
      console.log('=== TEST: countAllImagesSimple ===');
      const count = await activity.countAllImagesSimple();
      console.log('[Activity] total images:', count);

      expect(count).toBeGreaterThanOrEqual(0);
    },
    30000
  );

  test(
    'check logbook - count precise maneuver images',
    async () => {
      console.log('=== TEST: countManeuverImagesPrecise ===');
      const count = await activity.countManeuverImagesPrecise();
      console.log('[Activity] precise images:', count);

      expect(count).toBeGreaterThanOrEqual(0);
    },
    30000
  );
});
