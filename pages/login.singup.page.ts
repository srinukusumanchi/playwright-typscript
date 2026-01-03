import { Locator, Page } from "@playwright/test";


class loginOrSignup {
    readonly page: Page;
    readonly loginToYourAccount: Locator
    readonly name: Locator;
    readonly email: Locator;
    readonly signup: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loginToYourAccount = page.getByRole('heading', { name: 'Login to your account' })
        this.name = page.getByRole('textbox', { name: 'Name' });
        this.email = page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address');
        this.signup = page.getByRole('button', { name: 'Signup' });

    }

    async verifyLoginToYourAccount(): Promise<Locator> {
        return this.loginToYourAccount;
    }
    async getPageTitle(): Promise<string> {
        return await this.page.title();
    }

    async enterName(name: string) {
        await this.name.fill(name);
    }

    async enterEmailAddress(emailAddress: string) {
        await this.email.fill(emailAddress);
    }

    async clickSignUp() {
        await this.signup.click();
    }

}

export default loginOrSignup;