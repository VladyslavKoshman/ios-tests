// tests/login.test.js
import fs from 'fs';
import { getDriver, quitDriver } from '../utils/driver.js';
// ^ если у тебя driver лежит в driver/driver.js, поменяй на '../driver/driver.js'
import LoginScreen from '../screens/LoginScreen.js';

describe('Login flow', () => {
  let driver;
  let loginScreen;

  beforeAll(
    async () => {
      driver = await getDriver();
      loginScreen = new LoginScreen(driver);
      console.log('=== beforeAll: driver создан, LoginScreen инициализирован ===');
    },
    30000
  );

  afterAll(
    async () => {
      console.log('=== afterAll: закрываем сессию драйвера ===');
      await quitDriver();
    },
    30000
  );

  test(
    'User can log in with valid credentials',
    async () => {
      console.log('=== START TEST: User can log in with valid credentials ===');
      const env = process.env.TEST_ENV || 'sim';
      console.log('TEST_ENV =', env);

      // Логин/пароль — можешь вынести в env-переменные
      const username = process.env.MP_USERNAME || 'swd76129@bcooq.com';
      const password = process.env.MP_PASSWORD || 'qwerty';

      try {
        // Пытаемся залогиниться (или пропускаем, если уже на My Activity)
        await loginScreen.login(username, password);

        console.log('=== Ждём домашний экран (My Activity) ===');
        const isHome = await loginScreen.waitForHomeScreen(20000);
        console.log('waitForHomeScreen result =', isHome);

        expect(isHome).toBeTruthy();
        console.log('=== TEST PASSED: login успешен, My Activity виден ===');
      } catch (error) {
        console.error('=== TEST FAILED во время login или ожидания My Activity ===');
        console.error(error);

        try {
          const src = await driver.getPageSource();
          console.log('=== PAGE SOURCE ON ERROR ===\n', src);

          const screenshot = await driver.takeScreenshot();
          const filePath = './debug_login_failure.png';
          fs.writeFileSync(filePath, screenshot, 'base64');
          console.log('Скриншот сохранён:', filePath);
        } catch (innerErr) {
          console.error('Ошибка при попытке снять дамп/скрин:', innerErr);
        }

        throw error;
      }
    },
    60000
  );
});
