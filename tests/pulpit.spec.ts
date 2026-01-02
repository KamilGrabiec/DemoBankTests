import { test, expect } from "@playwright/test";
import { loginData } from "../test-data/login.data";
import LoginPage from "../pages/login.page";
import PulpitPage from "../pages/pulpit.page";

test.describe("Send transfer", () => {
  let pulpitPage: PulpitPage;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    pulpitPage = new PulpitPage(page);
    loginPage = new LoginPage(page);
    const username = loginData.username;
    const password = loginData.password;

    await page.goto("/");
    await loginPage.login(username, password);
    await page.waitForLoadState("domcontentloaded");
  });

  test("internal transfer", async ({ page }) => {
    //Arrange
    const transferReceiver = "2";
    const transferAmount = "150";
    const transferTitle = "Przelew wewnętrzny";
    const expectedString =
      "Przelew wykonany! Chuck Demobankowy - 150,00PLN - Przelew wewnętrzny";

    // Act
    await pulpitPage.transfer(transferReceiver, transferAmount, transferTitle);
    await pulpitPage.closeModal();

    // Assert
    await pulpitPage.expectMessageText(expectedString);
  });

  test("Successful mobile top-up", async ({ page }) => {
    // Arrange
    const topUpOption = "500 xxx xxx";
    const topUpAmount = "50";
    const expectedTopUpMessage =
      "Doładowanie wykonane! 50,00PLN na numer 500 xxx xxx";

    // Act
    await pulpitPage.topUp(topUpOption, topUpAmount);

    // Assert
    await pulpitPage.expectMessageText(expectedTopUpMessage);
  });

  test("Correct balance after successful mobile top-up", async ({ page }) => {
    // Arrange
    const topUpOption = "500 xxx xxx";
    const topUpAmount = "50";
    const expectedTopUpMessage = `Doładowanie wykonane! ${topUpAmount},00PLN na numer ${topUpOption}`;
    const initialBalance = await page.locator("#money_value").innerText();
    const expectedBalance = Number(initialBalance) - Number(topUpAmount);

    // Act
    await pulpitPage.topUp(topUpOption, topUpAmount);

    // Assert
    await pulpitPage.expectMessageText(expectedTopUpMessage);
    await pulpitPage.expectMoneyValue(`${expectedBalance}`);
  });
});
