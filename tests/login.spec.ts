import { expect, test } from "@playwright/test";
import { loginData } from "../test-data/login.data";
import LoginPage from "../pages/login.page";


test.describe("Login test", () => {
  
  test.beforeEach(async ({page}) => {
    await page.goto('/');
  })
  
  test("Successfully login with correct credentials", async ({ page }) => {
    // Arrange 
    const username = loginData.username;
    const password = loginData.password;
    const expectedUsername = "Jan Demobankowy";
    
    // Act
    const loginPage = new LoginPage(page);
    loginPage.login(username, password);

    // Assert
    await expect(page.getByTestId("user-name")).toHaveText(expectedUsername);
  });

  test("Unsuccessfully login with to short login", async ({ page }) => {
    // Arrange 
    const invalidUsername = "short";
    const password = loginData.password;
    const expectedErrorMessage = "identyfikator ma min. 8 znaków";

    // Act
    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(invalidUsername);
    await loginPage.passwordInput.fill(password);

    // Assert
    await expect(page.getByTestId("error-login-id")).toHaveText(
      expectedErrorMessage,
    );
  });
});
