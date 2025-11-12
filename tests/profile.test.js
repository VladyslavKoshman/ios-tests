import { getDriver, quitDriver } from '../utils/driver.js';
import ProfileScreen from '../screens/ProfileScreen.js';

let driver;
let profile;

beforeAll(async () => {
  driver = await getDriver();
  profile = new ProfileScreen(driver);
});

afterAll(async () => {
  await quitDriver();
});

describe('Profile page', () => {
  test('add aircraft', async () => {
    await profile.addAircraft('AutoTest');
    const visible = await profile.isAircraftVisibleByTail('AUTOTEST');
    expect(visible).toBeTruthy();
  });

  test('change icon of aircraft and add', async () => {
    await profile.changeIconAndAddAircraft('AutoTest2');
    const visible = await profile.isAircraftVisibleByTail('AUTOTEST2');
    expect(visible).toBeTruthy();
  });
});
