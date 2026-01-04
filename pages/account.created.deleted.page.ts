import { Locator, Page } from "@playwright/test";



class accountCreatedDeleted {

    readonly accountCreated: Locator;
    readonly accountDeleted: Locator;
    readonly continueButton: Locator;
    constructor(page: Page) {
        this.accountCreated = page.getByText('Account Created!');
        this.accountDeleted = page.getByText('Account Deleted!');
        this.continueButton = page.getByRole('link', { name: 'Continue' })
    }

    async getAccountDeleted(): Promise<Locator> {
        return this.accountDeleted;
    }

    async getAccountCreated(): Promise<Locator> {
        return this.accountCreated;
    }

    async clickContinue(): Promise<void> {
        return this.continueButton.click();
    }

}

export default accountCreatedDeleted