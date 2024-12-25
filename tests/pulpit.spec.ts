import { test, expect } from "@playwright/test";

test.describe("Send transfer", () => {

  test.beforeEach(async ({page}) => {
    const url = "https://demo-bank.vercel.app";
    await page.goto(url);
  })

  test("internal transfer", async ({ page }) => {
    //Arrange
    const username = "random string username";
    const password = "random string password";
    const transferReceiver = "2";
    const transferAmount = "150";
    const transferTitle = "Przelew wewnętrzny";
    const expectedString =
      "Przelew wykonany! Chuck Demobankowy - 150,00PLN - Przelew wewnętrzny";

    // Act  
    await page.getByTestId("login-input").click;
    await page.getByTestId("login-input").fill(username);
    await page.getByTestId("password-input").click;
    await page.getByTestId("password-input").fill(password);
    await page.getByTestId("login-button").click();
    await page.getByTestId("user-name").click();

    await page.waitForLoadState("domcontentloaded");

    await page.locator("#widget_1_transfer_receiver").selectOption(transferReceiver);
    await page.locator("#widget_1_transfer_amount").fill(transferAmount);
    await page.locator("#widget_1_transfer_title").fill(transferTitle);
    await page.locator("#execute_btn").click();

    await page.getByTestId("close-button").click();
    
    // Assert
    await expect(page.getByTestId("message-text")).toHaveText(expectedString);
  });
  
  test("Successful mobile top-up", async ({ page }) => {
    // Arrange
    const username = "random string username";
    const password = "random string password";
    const topUpOption = "500 xxx xxx";
    const topUpAmount = "50";
    const expectedTopUpMessage = "Doładowanie wykonane! 50,00PLN na numer 500 xxx xxx";
    
    // Act
    await page.getByTestId("login-input").click;
    await page.getByTestId("login-input").fill(username);
    await page.getByTestId("password-input").click;
    await page.getByTestId("password-input").fill(password);
    await page.getByTestId("login-button").click();
    await page.getByTestId("user-name").click();
    
    await page.waitForLoadState("domcontentloaded");
    
    await page.locator("#widget_1_topup_receiver").selectOption(topUpOption);
    await page.locator("#widget_1_topup_amount").click();
    await page.locator("#widget_1_topup_amount").fill(topUpAmount);
    await page.locator("#uniform-widget_1_topup_agreement").click();
    await page.getByRole("button", { name: "doładuj telefon" }).click();
    
    await page.getByRole("button", { name: "ok" }).click();
    
    // Assert
    await expect(page.getByTestId("message-text")).toHaveText(expectedTopUpMessage);
  });
});

