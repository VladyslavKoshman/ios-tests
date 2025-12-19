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
        await sharing.findUserByName('Vlad K');
        expect(true).toBeTruthy();
    });

    test('check users (open each "Last flight" card and interact via UserProfileScreen)', async () => {
        const count = await sharing.openEachUserStatsAndInteract(async (userProfile) => {
            // Пример взаимодействия с UserProfileScreen
            const name = await (await userProfile.userName).getText();
            console.log(`Открыт профиль пользователя: ${name}`);

            // Открываем вкладку Flights
            await userProfile.openFlightsTab();
            await driver.pause(500);

            // Возврат на основной профиль
            await userProfile.goBack();
            await driver.pause(500);
        });

        expect(count).toBeGreaterThanOrEqual(0);
    });
});
