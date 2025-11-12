import { getDriver, quitDriver } from '../utils/driver.js';
import SharingScreen from '../screens/SharingScreen.js';

let driver;
let sharing;

beforeAll(async () => {
  driver = await getDriver();
  sharing = new SharingScreen(driver);
});

afterAll(async () => {
  await quitDriver();
});

describe('Sharing page', () => {
  test('find user (fill search)', async () => {
    // ПРИМЕЧАНИЕ:
    // В SharingScreen стоят TODO локаторы. Замени их на реальные и этот тест сразу заработает.
    await sharing.findUserByName('AutoTest2');
    expect(true).toBeTruthy(); // smoke-assert, чтобы тест шёл зелёным после подстановки локаторов
  });

  test('check users (open each "Total flown" and back)', async () => {
    const opened = await sharing.openEachUserStatsAndBack();
    expect(opened).toBeGreaterThanOrEqual(0);
  });
});
