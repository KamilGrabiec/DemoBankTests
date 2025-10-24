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

  // Here I think I have a case where TypeScript things happends
  async login(username, password) {
    await this.loginInput.fill(username);
    await this.passwordInput.fill(password);
    await this.confirmButton.click();
  }
}

export default LoginPage;
