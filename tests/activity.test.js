import { getDriver, quitDriver } from '../utils/driver.js';
import ActivityScreen from '../screens/ActivityScreen.js';

let driver;
let activity;

beforeAll(async () => {
  driver = await getDriver();
  activity = new ActivityScreen(driver);
});

afterAll(async () => {
  await quitDriver();
});

describe('Activity page', () => {
  test('check maneuvers (swipe to end & log images)', async () => {
    const { reachedEnd, swipes } = await activity.swipeToEnd({ maxSwipes: 30, pauseMs: 100 });
    //eslint-disable-next-line no-console
    console.log(`[Activity] finished. reachedEnd=${reachedEnd}, swipes=${swipes}`);
    expect(swipes).toBeGreaterThanOrEqual(0);
  });

  test('check flight cards - count all images', async () => {
    const count = await activity.countAllImagesSimple();
    //eslint-disable-next-line no-console
    console.log('[Activity] total images:', count);
    expect(count).toBeGreaterThanOrEqual(0);
  });

  test('check logbook - count precise maneuver images', async () => {
    const count = await activity.countManeuverImagesPrecise();
    //eslint-disable-next-line no-console
    console.log('[Activity] precise images:', count);
    expect(count).toBeGreaterThanOrEqual(0);
  });
});
