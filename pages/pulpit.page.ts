import { expect, Locator, Page } from "@playwright/test";

export class PulpitPage {
  transferReceiver: Locator;
  transferAmount: Locator;
  transferTitle: Locator;
  transferButton: Locator;
  modalCloseButton: Locator;
  topUpReceiver: Locator;
  topUpAmount: Locator;
  topUpCheckbox: Locator;
  topUpButton: Locator;
  messageText: Locator;
  moneyValue: Locator;

  constructor(private page: Page) {
    this.transferReceiver = this.page.locator("#widget_1_transfer_receiver");
    this.transferAmount = this.page.locator("#widget_1_transfer_amount");
    this.transferTitle = this.page.locator("#widget_1_transfer_title");
    this.transferButton = this.page.locator("#execute_btn");
    this.topUpReceiver = this.page.locator("#widget_1_topup_receiver");
    this.topUpAmount = this.page.locator("#widget_1_topup_amount");
    this.topUpCheckbox = this.page.locator("#uniform-widget_1_topup_agreement");
    this.topUpButton = this.page.getByRole("button", {
      name: "doładuj telefon",
    });
    this.modalCloseButton = this.page.getByTestId("close-button");
    this.messageText = this.page.getByTestId("message-text");
    this.moneyValue = this.page.locator("#money_value");
  }

  async transfer(
    transferReceiver: string,
    transferAccount: string,
    transferTitle: string
  ): Promise<void> {
    await this.transferReceiver.selectOption(transferReceiver);
    await this.transferAmount.fill(transferAccount);
    await this.transferTitle.fill(transferTitle);
    await this.transferButton.click();
  }

  async topUp(topUpReceiver: string, topUpAmount: string): Promise<void> {
    await this.topUpReceiver.selectOption(topUpReceiver);
    await this.topUpAmount.click();
    await this.topUpAmount.fill(topUpAmount);
    await this.topUpCheckbox.click();
    await this.topUpButton.click();
  }

  async closeModal(): Promise<void> {
    await this.modalCloseButton.click();
  }

  // Assertions
  async expectMessageText(expectedText: string): Promise<void> {
    await expect(this.messageText).toHaveText(expectedText);
  }

  async expectMoneyValue(expectedValue: string): Promise<void> {
    await expect(this.moneyValue).toHaveText(expectedValue);
  }
}

export default PulpitPage;
