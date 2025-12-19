// screens/LoginScreen.js
import BaseScreen from './BaseScreen.js';

export default class LoginScreen extends BaseScreen {
  constructor(driver) {
    super(driver);
    this.driver = driver;
  }

  // Кнопка "Sign In" на стартовом экране (landing)
  get landingSignInButton() {
    return this.driver.$('//XCUIElementTypeButton[@name="Sign In"]');
  }

    // Поле Email в форме логина
    get emailField() {
        return this.driver.$(
            '//XCUIElementTypeTextField[@value="Email"]'
        );
    }
    // Поле Password в форме логина
    get passwordField() {
        return this.driver.$(
            '//XCUIElementTypeSecureTextField[@value="Password"]'
        );
    }


    // Кнопка "Sign In" в форме логина
  get formSignInButton() {
    // В макете кнопка называется так же "Sign In", используем тот же локатор
    return this.driver.$('//XCUIElementTypeButton[@name="Sign In"]');
  }

  // === Домашний экран (экран после логина) ===
  // Определяем его по заголовку "My Activity"
  async isOnHomeScreen() {
    const elems = await this.driver.$$('//XCUIElementTypeStaticText[@name="My Activity"]');
    if (elems.length === 0) {
      return false;
    }
    return elems[0].isDisplayed();
  }

  async waitForHomeScreen(timeout = 20000) {
    const start = Date.now();
    while (Date.now() - start < timeout) {
      try {
        if (await this.isOnHomeScreen()) {
          return true;
        }
      } catch (e) {
        // игнорим временные ошибки, пробуем ещё
      }
      await this.driver.pause(500);
    }
    return false;
  }

  // === Экран формы логина ===

  // Форма логина видна (заголовок "Sign In" + поля)
  async isSignInFormVisible() {
    const header = await this.driver.$$('//XCUIElementTypeStaticText[@name="Sign In"]');
    if (header.length === 0) {
      return false;
    }
    return header[0].isDisplayed();
  }

  async waitForSignInForm(timeout = 10000) {
    const start = Date.now();
    while (Date.now() - start < timeout) {
      try {
        if (await this.isSignInFormVisible()) {
          return true;
        }
      } catch (e) {
        // можем словить временную ошибку, пробуем ещё
      }
      await this.driver.pause(500);
    }
    return false;
  }

  // Открываем форму логина со стартового экрана
  async openLoginForm() {
    console.log('LoginScreen.openLoginForm(): открываем форму логина');

    // Если уже на домашнем экране – форма логина не нужна
    if (await this.isOnHomeScreen()) {
      console.log('LoginScreen.openLoginForm(): уже на домашнем экране, логин не нужен');
      return;
    }

    // Если форма логина уже открыта – просто выходим
    if (await this.isSignInFormVisible()) {
      console.log('LoginScreen.openLoginForm(): форма логина уже открыта');
      return;
    }

    const btn = await this.landingSignInButton;
    await this.click(btn);

    const visible = await this.waitForSignInForm(10000);
    console.log('LoginScreen.openLoginForm(): waitForSignInForm =', visible);

    if (!visible) {
      throw new Error('Форма логина не открылась за 10с');
    }
  }

  async typeEmail(email) {
    console.log('LoginScreen.typeEmail():', email);
    const field = await this.emailField;
    await this.type(field, email); // BaseScreen.type -> waitForDisplayed + setValue
  }

  async typePassword(password) {
    console.log('LoginScreen.typePassword():', password);
    const field = await this.passwordField;
    await this.type(field, password);
  }

  async submitLogin() {
    console.log('LoginScreen.submitLogin(): жмём Sign In на форме логина');
    const btn = await this.formSignInButton;
    await this.click(btn);
  }

  // Главный метод логина
  async login(username, password) {
    console.log('LoginScreen.login(): start, username =', username);

    // Если уже залогинены и видим My Activity – ничего не делаем
    if (await this.isOnHomeScreen()) {
      console.log('LoginScreen.login(): уже на домашнем экране, выходим из login()');
      return;
    }

    // Открываем форму логина (если надо)
    await this.openLoginForm();

    if (!(await this.isSignInFormVisible())) {
      throw new Error('После openLoginForm форма логина всё ещё не видна');
    }

    await this.typeEmail(username);
    await this.typePassword(password);
    await this.submitLogin();

    console.log('LoginScreen.login(): end (домашний экран ждём в тесте)');
  }
}
