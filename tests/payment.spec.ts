import { test, expect } from "@playwright/test";
import { loginData } from "../test-data/login.data";
import { LoginPage } from "../pages/login.page";
import { PaymentPage } from "../pages/payment.page";
import SideMenuComponent from "../components/side-menu.component";

test.describe("Payment tests", () => {
  let loginPage: LoginPage;
  let paymentPage: PaymentPage;

  test.describe.configure({ retries: 3 });
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    paymentPage = new PaymentPage(page);
    const sideMenu = new SideMenuComponent(page);
    const username = loginData.username;
    const password = loginData.password;

    await page.goto("/");
    await loginPage.login(username, password);
    await page.waitForLoadState("domcontentloaded");

    await sideMenu.selectPayment();
  });

  test(
    "simple payment",
    {
      tag: ["@payment"],
      annotation: {
        type: "documentation",
        description: "https://jaktestowac.pl/course/playwright-wprowadzenie/",
      },
    },
    async ({ page }) => {
      // Arrange
      const transferReceiver = "Jan Nowak";
      const transferAccount = "12 3456 7890 1234 5678 9012 34568";
      const transferAmount = "222";
      const expectedMessage = `Przelew wykonany! ${transferAmount},00PLN dla Jan Nowak`;

      // Act
      await paymentPage.executeTransfer(
        transferReceiver,
        transferAccount,
        transferAmount
      );

      // Assert
      await paymentPage.expectMessageText(expectedMessage);
    }
  );
});
