import { expect, test } from "@playwright/test";
import { loginData } from "../test-data/login.data";
import LoginPage from "../pages/login.page";

test.describe("Login test", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("Successfully login with correct credentials", async ({ page }) => {
    // Arrange
    const loginPage = new LoginPage(page);
    const username = loginData.username;
    const password = loginData.password;
    const expectedUsername = "Jan Demobankowy";

    // Act
    await loginPage.login(username, password);

    // Assert
    await expect(page.getByTestId("user-name")).toHaveText(expectedUsername);
  });

  test("Unsuccessfully login with to short login", async ({ page }) => {
    // Arrange
    const loginPage = new LoginPage(page);
    const invalidUsername = "short";
    const password = loginData.password;
    const expectedErrorMessage = "identyfikator ma min. 8 znaków";

    // Act
    await loginPage.fillLogin(invalidUsername, password);

    // Assert
    await expect(page.getByTestId("error-login-id")).toHaveText(
      expectedErrorMessage
    );
  });

  test("Unsuccessfully login with to short password", async ({ page }) => {
    // Arrange
    const loginPage = new LoginPage(page);
    const username = loginData.username;
    const invalidPassword = "short";
    const expectedErrorMessage = "hasło ma min. 8 znaków";

    // Act
    await loginPage.fillLogin(username, invalidPassword);
    await page.getByTestId("login-input").click();

    // Assert
    await expect(page.getByTestId("error-login-password")).toHaveText(
      expectedErrorMessage
    );
  });
});
