import BaseScreen from './BaseScreen.js';

export default class LoginScreen extends BaseScreen {
  get usernameField() {
    return this.driver.$('~username');
  }

  get passwordField() {
    return this.driver.$('~password');
  }

  get loginButton() {
    return this.driver.$('~loginBtn');
  }

  async login(username, password) {
    await this.type(this.usernameField, username);
    await this.type(this.passwordField, password);
    await this.click(this.loginButton);
  }
}
