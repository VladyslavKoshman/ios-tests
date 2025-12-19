// screens/UserProfileScreen.js
import BaseScreen from './BaseScreen.js';

export default class UserProfileScreen extends BaseScreen {
    constructor(driver) {
        super(driver);
        this.driver = driver;
    }

    // --- Заголовок с именем пользователя ---
    get userName() {
        return this.driver.$('//XCUIElementTypeStaticText[@value="Vlad Koshman"]');
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

    // --- Прочие элементы полётов (первый блок) ---
    get firstFlightLocation() {
        return this.driver.$('//XCUIElementTypeStaticText[@value="Near Lehigh Acres"]');
    }

    get firstFlightAircraft() {
        return this.driver.$('//XCUIElementTypeStaticText[contains(@value,"0FL0")]');
    }

    get firstFlightDuration() {
        return this.driver.$('//XCUIElementTypeStaticText[contains(@value,"h")]');
    }

    // --- Кнопка вопросика (неактивная/дополнительно) ---
    get questionIcon() {
        return this.driver.$('//XCUIElementTypeButton[@name="question-icon"]');
    }

    // --- Кнопки для взаимодействия с клавиатурой (если нужно) ---
    get nextKeyboardButton() {
        return this.driver.$('//XCUIElementTypeButton[@name="Next keyboard"]');
    }

    get dictationButton() {
        return this.driver.$('//XCUIElementTypeButton[@name="dictation"]');
    }

    // --- Пример действия: открытие вкладки Flights ---
    async openFlightsTab() {
        await (await this.flightsTab).click();
    }

    // --- Пример действия: закрытие профиля через стрелку назад ---
    async goBack() {
        await (await this.leftArrowButton).click();
    }
}
