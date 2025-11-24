// tests/debugPage.test.js
import { getDriver, quitDriver } from '../utils/driver.js';

let driver;

beforeAll(async () => {
  driver = await getDriver();
});

afterAll(async () => {
  await quitDriver();
});

test('dump current page source', async () => {
  console.log('Жду 15 секунд. За это время открой экран редактирования самолёта в симуляторе.');
  await driver.pause(15000); // можешь увеличить/уменьшить, если нужно

  const source = await driver.getPageSource();

  console.log('===== CURRENT PAGE SOURCE START =====');
  console.log(source);
  console.log('===== CURRENT PAGE SOURCE END =====');
});
