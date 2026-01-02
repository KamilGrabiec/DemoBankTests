import { expect, Locator, Page } from "@playwright/test";

export class PaymentPage {
  transferReceiver: Locator;
  transferAccount: Locator;
  transferAmount: Locator;
  confrimButton: Locator;
  closeModalButton: Locator;
  message: Locator;

  constructor(private page: Page) {
    this.transferReceiver = this.page.getByTestId("transfer_receiver");
    this.transferAccount = this.page.getByTestId("form_account_to");
    this.transferAmount = this.page.getByTestId("form_amount");
    this.confrimButton = this.page.getByRole("button", {
      name: "wykonaj przelew",
    });
    this.closeModalButton = this.page.getByTestId("close-button");
    this.message = this.page.locator("#show_messages");
  }

  async executeTransfer(
    transferReceiver: string,
    transferAccount: string,
    transferAmount: string
  ): Promise<void> {
    await this.transferReceiver.fill(transferReceiver);
    await this.transferAccount.fill(transferAccount);
    await this.transferAmount.fill(transferAmount);
    await this.confrimButton.click();
    await this.closeModalButton.click();
  }

  // Assertions
  async expectMessageText(expectedMessage: string): Promise<void> {
    await expect(this.message).toHaveText(expectedMessage);
  }
}

export default PaymentPage;
