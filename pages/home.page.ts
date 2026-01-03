import { Locator, Page } from "@playwright/test";

class home {

    readonly page: Page;
    readonly deleteAccount: Locator;

    constructor(page: Page) {
        this.page = page;
        this.deleteAccount = page.getByRole('link', { name: 'Delete Account' });
    }

    async clickDeleteAccount() {
        await this.deleteAccount.click();
    }
}

export default home;