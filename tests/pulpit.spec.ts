import { test, expect } from "@playwright/test";
import { loginData } from "../test-data/login.data";
import LoginPage from "../pages/login.page";

test.describe("Send transfer", () => {

  test.beforeEach(async ({page}) => {
    const username = loginData.username
    const password = loginData.password
    const loginPage = new LoginPage(page)

    await page.goto('/');    
    await loginPage.login(username, password)
    await page.waitForLoadState("domcontentloaded");
  })

  test("internal transfer", async ({ page }) => {
    //Arrange
    const transferReceiver = "2";
    const transferAmount = "150";
    const transferTitle = "Przelew wewnętrzny";
    const expectedString =
      "Przelew wykonany! Chuck Demobankowy - 150,00PLN - Przelew wewnętrzny";

    // Act  
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
    const topUpOption = "500 xxx xxx";
    const topUpAmount = "50";
    const expectedTopUpMessage = "Doładowanie wykonane! 50,00PLN na numer 500 xxx xxx";
    
    // Act    
    await page.locator("#widget_1_topup_receiver").selectOption(topUpOption);
    await page.locator("#widget_1_topup_amount").click();
    await page.locator("#widget_1_topup_amount").fill(topUpAmount);
    await page.locator("#uniform-widget_1_topup_agreement").click();
    await page.getByRole("button", { name: "doładuj telefon" }).click();
    
    await page.getByRole("button", { name: "ok" }).click();
    
    // Assert
    await expect(page.getByTestId("message-text")).toHaveText(expectedTopUpMessage);
  });

  test("Correct balance after successful mobile top-up", async ({ page }) => {
    // Arrange
    const topUpOption = "500 xxx xxx";
    const topUpAmount = "50";
    const expectedTopUpMessage = `Doładowanie wykonane! ${topUpAmount},00PLN na numer ${topUpOption}`;
    const initialBalance = await page.locator("#money_value").innerText()
    const expectedBalance = Number(initialBalance) - Number(topUpAmount)
    
    // Act    
    await page.locator("#widget_1_topup_receiver").selectOption(topUpOption);
    await page.locator("#widget_1_topup_amount").click();
    await page.locator("#widget_1_topup_amount").fill(topUpAmount);

    await page.locator("#uniform-widget_1_topup_agreement").click();
    await page.getByRole("button", { name: "doładuj telefon" }).click();
    
    await page.getByRole("button", { name: "ok" }).click();
    // Assert
    await expect(page.getByTestId("message-text")).toHaveText(expectedTopUpMessage);
    await expect(page.locator("#money_value")).toHaveText(`${expectedBalance}`)
  });
});

