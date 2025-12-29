import { Locator, Page } from "@playwright/test";

export class LoginPage {
  loginInput: Locator;
  passwordInput: Locator;
  confirmButton: Locator;

  constructor(private page: Page) {
    this.loginInput = this.page.getByTestId("login-input");
    this.passwordInput = this.page.getByTestId("password-input");
    this.confirmButton = this.page.getByTestId("login-button");
  }

  async login(username: string, password: string) {
    await this.fillLogin(username, password);
    await this.confirmButton.click();
  }

  async fillLogin(username: string, password: string) {
    await this.loginInput.fill(username);
    await this.passwordInput.fill(password);
  }
}

export default LoginPage;
