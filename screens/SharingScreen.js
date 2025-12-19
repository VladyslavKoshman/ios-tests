// screens/SharingScreen.js
import BaseScreen from './BaseScreen.js';

export default class SharingScreen extends BaseScreen {
    constructor(driver) {
        super(driver);
        this.driver = driver;
    }

    // --- Метод поиска пользователя по полному имени ---
    async openUserByName(userName) {
        const userButton = await this.driver.$(
            `//XCUIElementTypeButton[.//XCUIElementTypeStaticText[@name="${userName}"]]`
        );
        await userButton.waitForDisplayed({ timeout: 5000 });
        await userButton.click();

        // Ждём появления элемента профиля (имя пользователя на странице профиля)
        const userProfileName = await this.driver.$(
            `//XCUIElementTypeStaticText[@name="${userName}"]`
        );
        await userProfileName.waitForDisplayed({ timeout: 5000 });
    }

    // --- Открыть первого пользователя ---
    async openFirstUser() {
        const firstUserButton = await this.driver.$(
            '//XCUIElementTypeButton[.//XCUIElementTypeStaticText[@name="Kirill2 Serebriakov"]]'
        );
        await firstUserButton.waitForDisplayed({ timeout: 5000 });
        await firstUserButton.click();
    }

    // --- Геттер для проверки первого пользователя после возврата ---
    get firstUser() {
        return this.driver.$(
            '//XCUIElementTypeButton[.//XCUIElementTypeStaticText[@name="Kirill2 Serebriakov"]]'
        );
    }
}
