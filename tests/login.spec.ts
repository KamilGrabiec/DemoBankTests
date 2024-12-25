import { expect, test } from "@playwright/test";

test.describe("Login test", () => {

  test.beforeEach(async ({page}) => {
    await page.goto('/');
  })

  test("Successfully login with correct credentials", async ({ page }) => {
    // Arrange 
    const username = "random string username";
    const password = "random string password";
    const expectedUsername = "Jan Demobankowy";
    
    // Act
    await page.getByTestId("login-input").click;
    await page.getByTestId("login-input").fill(username);
    await page.getByTestId("password-input").click;
    await page.getByTestId("password-input").fill(password);
    await page.getByTestId("login-button").click();
    await page.getByTestId("user-name").click();

    // Assert
    await expect(page.getByTestId("user-name")).toHaveText(expectedUsername);
  });

  test("Unsuccessfully login with to short login", async ({ page }) => {
    // Arrange 
    const invalidUsername = "short";
    const password = "random string password";
    const expectedErrorMessage = "identyfikator ma min. 8 znaków";

    // Act
    await page.getByTestId("login-input").click;
    await page.getByTestId("login-input").fill(invalidUsername);
    await page.getByTestId("password-input").click;
    await page.getByTestId("password-input").fill(password);

    // Assert
    await expect(page.getByTestId("error-login-id")).toHaveText(
      expectedErrorMessage,
    );
  });
});
