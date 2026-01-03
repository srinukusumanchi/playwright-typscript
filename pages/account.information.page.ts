import { Locator, Page } from "@playwright/test";


class accountInformation {
    readonly page: Page;
    readonly titleMr: Locator;
    readonly titleMrs: Locator;
    readonly name: Locator;
    readonly email: Locator;
    readonly password: Locator;
    readonly day: Locator;
    readonly month: Locator;
    readonly year: Locator;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly company: Locator;
    readonly address: Locator;
    readonly address2: Locator;
    readonly country: Locator;
    readonly state: Locator;
    readonly city: Locator;
    readonly zipcode: Locator;
    readonly mobilenumber: Locator;
    readonly createAccount: Locator;

    constructor(page: Page) {
        this.page = page;
        this.titleMr = page.getByRole('radio', { name: 'Mr.' });
        this.titleMrs = page.getByRole('radio', { name: 'Mrs' });
        this.name = page.getByRole('textbox', { name: 'Name *', exact: true });
        this.email = page.getByRole('textbox', { name: 'Email *', exact: true });
        this.password = page.getByRole('textbox', { name: 'Password *' });
        this.day = page.locator('#days');
        this.month = page.locator('#months');
        this.year = page.locator('#years');
        this.firstName = page.getByRole('textbox', { name: 'First name *' });
        this.lastName = page.getByRole('textbox', { name: 'Last name *' });
        this.company = page.getByRole('textbox', { name: 'Company', exact: true });
        this.address = page.getByRole('textbox', { name: 'Address * (Street address, P.' });
        this.address2 = page.getByRole('textbox', { name: 'Address 2' });
        this.country = page.getByLabel('Country *');
        this.state = page.getByRole('textbox', { name: 'State *' });
        this.city = page.getByRole('textbox', { name: 'City *' });
        this.zipcode = page.locator('#zipcode');
        this.mobilenumber = page.getByRole('textbox', { name: 'Mobile Number *' });
        this.createAccount = page.getByRole('button', { name: 'Create Account' });
    }


    async selectTitle(title: string) {
        if (title === 'Mr.') {
            await this.titleMr.check();
        } else if (title === 'Mrs.') {
            await this.titleMrs.check();
        } else {
            throw new Error(`Mention either Mr. or Mrs. but you provided ${title}`)
        }
    }

    async enterName(name: string) {
        await this.name.fill(name);
    }

    async enterEmail(emailAddress: string) {
        await this.email.fill(emailAddress);
    }

    async enterPassword(password: string) {
        await this.password.fill(password);
    }

    async selectDay(day: string) {
        await this.day.selectOption({ label: day });
    }

    async selectMonth(month: string) {
        await this.month.selectOption({ label: month });
    }

    async selectYear(year: string) {
        await this.year.selectOption({ label: year });
    }

    async enterFirstName(firstName: string) {
        await this.firstName.fill(firstName);
    }

    async enterLastName(lastName: string) {
        await this.lastName.fill(lastName);
    }

    async enterCompany(company: string) {
        await this.company.fill(company);
    }

    async enterAddress(address: string) {
        await this.address.fill(address);
    }

    async enterAddress2(address2: string) {
        await this.address2.fill(address2);
    }

    async selectCountry(country: string) {
        await this.country.selectOption({ label: country });
    }

    async enterState(state: string) {
        await this.state.fill(state);
    }

     async enterCity(city: string) {
        await this.city.fill(city);
    }

    async enterZipcode(zipcode: string) {
        await this.zipcode.fill(zipcode);
    }

    async enterMobile(mobilenumber: string) {
        await this.mobilenumber.fill(mobilenumber);
    }

    async clickCreateAccount() {
        await this.createAccount.click();
    }

}

export default accountInformation;