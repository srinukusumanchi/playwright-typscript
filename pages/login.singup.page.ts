import { Locator, Page } from "@playwright/test";


class loginOrSignup {
    readonly page: Page;
    readonly loginToYourAccount: Locator
    readonly emailLogin: Locator;
    readonly login: Locator;
    readonly password: Locator;
    readonly name: Locator;
    readonly emailSignup: Locator;
    readonly signup: Locator;
    readonly invalidLogin: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loginToYourAccount = page.getByRole('heading', { name: 'Login to your account' });
        this.emailLogin = page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address');
        this.login = page.getByRole('button', { name: 'Login' });
        this.password = page.getByRole('textbox', { name: 'password' });
        this.name = page.getByRole('textbox', { name: 'Name' });
        this.emailSignup = page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address');
        this.signup = page.getByRole('button', { name: 'Signup' });
        this.invalidLogin = page.locator('p').filter({ hasText: 'Your email or password is incorrect!' });

    }

    async verifyLoginToYourAccount(): Promise<Locator> {
        return this.loginToYourAccount;
    }
    async getPageTitle(): Promise<string> {
        return await this.page.title();
    }

    async enterEmailAddressLogin(emailAddress: string): Promise<void> {
        await this.emailLogin.fill(emailAddress);
    }

    async enterPassword(emailAddress: string): Promise<void> {
        await this.password.fill(emailAddress);
    }



    async enterName(name: string): Promise<void> {
        await this.name.fill(name);
    }

    async enterEmailAddress(emailAddress: string): Promise<void> {
        await this.emailSignup.fill(emailAddress);
    }

    async clickSignUp(): Promise<void> {
        await this.signup.click();
    }

    async clickLogin(): Promise<void> {
        await this.login.click();
    }

    async getInvalidLoginMessage(): Promise<string | null> {
        return this.invalidLogin.textContent();
    }

}

export default loginOrSignup;