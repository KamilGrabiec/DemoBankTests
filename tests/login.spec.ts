import { expect, test } from "@playwright/test";
import { loginData } from "../test-data/login.data";
import LoginPage from "../pages/login.page";

test.describe("Login test", () => {
  let loginPage: LoginPage;
  const username = loginData.username;
  const password = loginData.password;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await page.goto("/");
  });

  test("Successfully login with correct credentials", async ({ page }) => {
    // Arrange
    const expectedUsername = "Jan Demobankowy";

    // Act
    await loginPage.login(username, password);

    // Assert
    await loginPage.expectUsernameText(expectedUsername);
  });

  test("Unsuccessfully login with to short login", async ({ page }) => {
    // Arrange
    const invalidUsername = "short";
    const expectedErrorMessage = "identyfikator ma min. 8 znaków";

    // Act
    await loginPage.fillLogin(invalidUsername, password);

    // Assert
    await loginPage.expectErrorLoginText(expectedErrorMessage);
  });

  test("Unsuccessfully login with to short password", async ({ page }) => {
    // Arrange
    const invalidPassword = "short";
    const expectedErrorMessage = "hasło ma min. 8 znaków";

    // Act
    await loginPage.fillLogin(username, invalidPassword);
    await page.getByTestId("login-input").click();

    // Assert
    await loginPage.expectErrorPasswordText(expectedErrorMessage);
  });
});
