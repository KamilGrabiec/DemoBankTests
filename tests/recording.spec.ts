import { test, expect } from "@playwright/test";
import LoginPage from "../pages/login.page";
import { loginData } from "../test-data/login.data";

test.describe("Payment test", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const userId = loginData.username;
    const userPassword = loginData.password;

    await page.goto("/");
    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.confirmButton.click();

    await page.getByRole("link", { name: "płatności" }).click();
  });

  test("payment", async ({ page }) => {
    // Recording...
    await page.getByTestId("transfer_receiver").click();
    await page.getByTestId("transfer_receiver").fill("Kamil Grabiec");
    await page.getByTestId("form_account_to").click();
    await page.getByTestId("form_account_to").fill("12 3456 789");
    await page.getByTestId("form_amount").click();
    await page.getByTestId("form_amount").fill("90000");

    await expect(
      page.getByTestId("error-widget-2-transfer-account")
    ).toHaveText("konto musi mieć 26 znaków");
  });
});
