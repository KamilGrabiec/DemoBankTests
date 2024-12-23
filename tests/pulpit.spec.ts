import { test, expect } from "@playwright/test";

test.describe("Send transfer", () => {
  test.only("internal transfer", async ({ page }) => {
    const url = "https://demo-bank.vercel.app";
    await page.goto(url);
    await page.getByTestId("login-input").click;
    await page.getByTestId("login-input").fill("random string username");
    await page.getByTestId("password-input").click;
    await page.getByTestId("password-input").fill("random string password");
    await page.getByTestId("login-button").click();
    await page.getByTestId("user-name").click();

    await page.waitForLoadState("domcontentloaded");

    await page.locator("#widget_1_transfer_receiver").selectOption("2");
    await page.locator("#widget_1_transfer_amount").fill("150");
    await page.locator("#widget_1_transfer_title").fill("Przelew wewnętrzny");
    await page.locator("#execute_btn").click();

    await page.getByTestId("close-button").click();
    const expectedString =
      "Przelew wykonany! Chuck Demobankowy - 150,00PLN - Przelew wewnętrzny BUG";
    await expect(page.getByTestId("message-text")).toHaveText(expectedString);
  });
});

test.describe("Mobile top-up", () => {
  test("Successful mobile top-up", async ({ page }) => {
    const url = "https://demo-bank.vercel.app";
    await page.goto(url);
    await page.getByTestId("login-input").click;
    await page.getByTestId("login-input").fill("random string username");
    await page.getByTestId("password-input").click;
    await page.getByTestId("password-input").fill("random string password");
    await page.getByTestId("login-button").click();
    await page.getByTestId("user-name").click();

    await page.waitForLoadState("domcontentloaded");

    await page.locator("#widget_1_topup_receiver").selectOption("500 xxx xxx");
    await page.locator("#widget_1_topup_amount").click();
    await page.locator("#widget_1_topup_amount").fill("50");

    await page.locator("#uniform-widget_1_topup_agreement").click();
    await page.getByRole("button", { name: "doładuj telefon" }).click();

    await page.getByRole("button", { name: "ok" }).click();
    const expectedString = "Doładowanie wykonane! 50,00PLN na numer 500 xxx xxx";
    await expect(page.getByTestId("message-text")).toHaveText(expectedString);
    await expect(page.getByTestId("message-text")).toContainText(
      "Doładowanie wykonane!",
    );
  });
});

// // By Role
// await page.getByRole('button', { name: 'Submit' }).click();

// // By Text
// await page.getByText('Welcome').click();

// // By Label
// await page.getByLabel('Username').fill('JohnDoe');

// // By Placeholder
// await page.getByPlaceholder('Enter your name').fill('John');

// // By Alt Text
// await page.getByAltText('Profile picture').click();

// // By Title
// await page.getByTitle('Close').click();

// // By Test ID
// await page.getByTestId('submit-button').click();
