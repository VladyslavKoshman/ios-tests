// screens/UserProfileScreen.js
import BaseScreen from './BaseScreen.js';

export default class UserProfileScreen extends BaseScreen {
    constructor(driver) {
        super(driver);
        this.driver = driver;
    }

    // --- Заголовок с именем пользователя ---
    getUserNameElement(userName) {
        // Ищем StaticText с точным именем пользователя
        return this.driver.$(`//XCUIElementTypeStaticText[@name="${userName}"]`);
    }

    // --- Информация о последнем полёте ---
    get lastFlightInfo() {
        return this.driver.$('//XCUIElementTypeStaticText[contains(@value,"Last flight")]');
    }

    // --- Кнопки в верхней части ---
    get logbookButton() {
        return this.driver.$('//XCUIElementTypeButton[@name="logbookLinear"]');
    }

    get newSearchButton() {
        return this.driver.$('//XCUIElementTypeImage[@name="newSearch"]');
    }

    get leftArrowButton() {
        return this.driver.$('//XCUIElementTypeButton[@name="leftArrowChevron"]');
    }

    // --- Основные вкладки пользователя ---
    get flightsTab() {
        return this.driver.$('//XCUIElementTypeButton[@name="Flights"]');
    }

    get maneuversTab() {
        return this.driver.$('//XCUIElementTypeButton[@name="Maneuvers"]');
    }

    // --- Первый полёт (динамически) ---
    get firstFlightBlock() {
        return this.driver.$('(//XCUIElementTypeOther[./XCUIElementTypeStaticText])[1]');
    }

    async openFirstFlight() {
        const block = await this.firstFlightBlock;
        await block.click();
    }

    // --- Кнопка вопросика ---
    get questionIcon() {
        return this.driver.$('//XCUIElementTypeButton[@name="question-icon"]');
    }

    // --- Кнопки для клавиатуры ---
    get nextKeyboardButton() {
        return this.driver.$('//XCUIElementTypeButton[@name="Next keyboard"]');
    }

    get dictationButton() {
        return this.driver.$('//XCUIElementTypeButton[@name="dictation"]');
    }

    // --- Методы действий ---
    async openFlightsTab() {
        await (await this.flightsTab).click();
    }

    async goBack() {
        await (await this.leftArrowButton).click();
    }
}
