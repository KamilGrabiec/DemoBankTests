import { expect, test } from "@playwright/test";

test.describe("Login test", () => {
  test("Successfully login with correct credentials", async ({ page }) => {
    await page.goto("https://demo-bank.vercel.app");
    await page.getByTestId("login-input").click;
    await page.getByTestId("login-input").fill("random string username");
    await page.getByTestId("password-input").click;
    await page.getByTestId("password-input").fill("random string password");
    await page.getByTestId("login-button").click();
    await page.getByTestId("user-name").click();

    await expect(page.getByTestId("user-name")).toHaveText("Jan Demobankowy");
  });

  test("Unsuccessfully login with to short login", async ({ page }) => {
    await page.goto("https://demo-bank.vercel.app");
    await page.getByTestId("login-input").click;
    await page.getByTestId("login-input").fill("short");
    await page.getByTestId("password-input").click;
    await page.getByTestId("password-input").fill("random string password");

    await expect(page.getByTestId("error-login-id")).toHaveText(
      "identyfikator ma min. 8 znaków",
    );
  });
});
