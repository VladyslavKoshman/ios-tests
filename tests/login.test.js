import { getDriver, quitDriver } from '../utils/driver.js';
import LoginScreen from '../screens/LoginScreen.js';

let driver;
let loginScreen;

beforeAll(async () => {
  driver = await getDriver();
  loginScreen = new LoginScreen(driver);
});

afterAll(async () => {
  await quitDriver();
});

describe('Login flow', () => {
  test('User can log in with valid credentials', async () => {
    await loginScreen.login('test_user', 'password123');

    const successElement = await driver.$('~homeScreen');
    const isDisplayed = await successElement.isDisplayed();

    expect(isDisplayed).toBeTruthy();
  });
});
