import type { Locator, Page } from "@playwright/test";

class home {

    readonly page: Page;
    readonly deleteAccount: Locator;
    readonly logout: Locator;

    constructor(page: Page) {
        this.page = page;
        this.deleteAccount = page.getByRole('link', { name: 'Delete Account' });
        this.logout = page.getByRole('link', { name: 'Logout' });

    }

    async clickDeleteAccount():Promise<void> {
        await this.deleteAccount.click();
    }

     async clickLogout():Promise<void> {
        await this.logout.click();
    }

    async getLoggedInCustomerName(userName: string):Promise<string|null> {
        return await this.page.getByText(`Logged in as ${userName}`).textContent();
    }
}

export default home;