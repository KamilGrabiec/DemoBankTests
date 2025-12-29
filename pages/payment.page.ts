import { Locator, Page } from "@playwright/test";

export class PaymentPage {
  transferReceiver: Locator;
  trasnferAccount: Locator;
  transferAmount: Locator;
  confrimButton: Locator;
  closeModalButton: Locator;

  constructor(private page: Page) {
    this.transferReceiver = this.page.getByTestId("transfer_receiver");
    this.trasnferAccount = this.page.getByTestId("form_account_to");
    this.transferAmount = this.page.getByTestId("form_amount");
    this.confrimButton = this.page.getByRole("button", {
      name: "wykonaj przelew",
    });
    this.closeModalButton = this.page.getByTestId("close-button");
  }

  async makeTransfer(
    transferReceiver: string,
    transferAccount: string,
    transferAmount: string
  ) {
    await this.transferReceiver.fill(transferReceiver);
    await this.trasnferAccount.fill(transferAccount);
    await this.transferAmount.fill(transferAmount);
    await this.confrimButton.click();
    await this.closeModalButton.click();
  }
}

export default PaymentPage;
