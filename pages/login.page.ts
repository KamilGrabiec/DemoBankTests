import { expect, Locator, Page } from "@playwright/test";

export class LoginPage {
  loginInput: Locator;
  passwordInput: Locator;
  confirmButton: Locator;
  username: Locator;
  errorLogin: Locator;
  errorPassword: Locator;

  constructor(private page: Page) {
    this.loginInput = this.page.getByTestId("login-input");
    this.passwordInput = this.page.getByTestId("password-input");
    this.confirmButton = this.page.getByTestId("login-button");
    this.username = this.page.getByTestId("user-name");
    this.errorLogin = this.page.getByTestId("error-login-id");
    this.errorPassword = this.page.getByTestId("error-login-password");
  }

  async login(username: string, password: string): Promise<void> {
    await this.fillLogin(username, password);
    await this.confirmButton.click();
  }

  async fillLogin(username: string, password: string): Promise<void> {
    await this.loginInput.fill(username);
    await this.passwordInput.fill(password);
  }

  // Assertions
  async expectUsernameText(expectedUsername: string): Promise<void> {
    await expect(this.username).toHaveText(expectedUsername);
  }

  async expectErrorLoginText(expectedErrorMessage: string): Promise<void> {
    await expect(this.errorLogin).toHaveText(expectedErrorMessage);
  }

  async expectErrorPasswordText(expectedErrorMessage: string): Promise<void> {
    await expect(this.errorPassword).toHaveText(expectedErrorMessage);
  }
}

export default LoginPage;
