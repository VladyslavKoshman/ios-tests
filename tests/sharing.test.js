// tests/userProfile.test.js
import { getDriver, quitDriver } from '../utils/driver.js';
import UserProfileScreen from '../screens/UserProfileScreen.js';
import SharingScreen from '../screens/SharingScreen.js';

let driver;
let userProfile;
let sharingScreen;

describe('User Profile - Open by Name', () => {
    //const userNameToOpen = 'Kirill2 Serebriakov'; // <-- можно менять на любое имя
    const userNameToOpen = 'Test Hannah'; // <-- можно менять на любое имя
    //const userNameToOpen = 'Sbff Sbff'; // <-- можно менять на любое

    beforeAll(async () => {
        driver = await getDriver();
        userProfile = new UserProfileScreen(driver);
        sharingScreen = new SharingScreen(driver);
    });

    afterAll(async () => {
        await quitDriver(driver);
    });

    it(`should open profile of ${userNameToOpen} and verify it`, async () => {
        await sharingScreen.openUserByName(userNameToOpen);

        const userNameEl = await userProfile.getUserNameElement(userNameToOpen);
        await userNameEl.waitForDisplayed({ timeout: 5000 });
        const name = await userNameEl.getText();
        expect(name).toBe(userNameToOpen);

        const lastFlight = await (await userProfile.lastFlightInfo).getText();
        expect(lastFlight).toContain('Last flight');

        await userProfile.openFirstFlight();
        const firstFlightBlock = await userProfile.firstFlightBlock;
        expect(await firstFlightBlock.isDisplayed()).toBe(true);
    });


    it('should go back from profile', async () => {
        // Сначала возвращаемся из полёта (если он был открыт)
        await userProfile.goBack();

        // Потом возвращаемся из профиля на страницу Sharing
        await userProfile.goBack();

        const firstUserVisible = await sharingScreen.firstUser.isDisplayed();
        expect(firstUserVisible).toBe(true);
    });
});
