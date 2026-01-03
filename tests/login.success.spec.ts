import { test, expect } from '@playwright/test';
import loginOrSignup from '../pages/login.singup.page';
import accountInformation from '../pages/account.information.page';
import accountCreatedDeleted from '../pages/account.created.deleted.page';
import home from '../pages/home.page';


let userName: string = "Srinu Kusumanchi";
let email: string = "srinukusumanchi@gmail.com"
let password: string = "Kanakavaram0386#";

test.beforeEach(async ({ page }) => {
  await page.goto("https://automationexercise.com/login");
});

test("Login User with correct email and password", async ({ page }) => {
  const loginSignupPage = new loginOrSignup(page);
  const accountInformationPage = new accountInformation(page);
  const accountCreatedDeletedPage = new accountCreatedDeleted(page);
  const homePage = new home(page);
  // Verify that home page is visible successfully
  expect(await loginSignupPage.getPageTitle()).toBe("Automation Exercise - Signup / Login");
  // verify 'Login to your account' is visible
  await expect(await loginSignupPage.verifyLoginToYourAccount()).toBeVisible();
  // Enter correct email address and password
  await loginSignupPage.enterName(userName);
  await loginSignupPage.enterEmailAddress(email);
  await loginSignupPage.clickSignUp();

  // Enter Account Information
  await accountInformationPage.selectTitle("Mr.");
  await accountInformationPage.enterPassword(password);
  await accountInformationPage.selectDay("15");
  await accountInformationPage.selectMonth("June");
  await accountInformationPage.selectYear("1994");

  // Address Information
  await accountInformationPage.enterFirstName("Srinu");
  await accountInformationPage.enterLastName("Kusumanchi");
  await accountInformationPage.enterCompany("Tangerine");
  await accountInformationPage.enterAddress("1910");
  await accountInformationPage.enterAddress2("80 Carabob");
  await accountInformationPage.selectCountry("Canada");
  await accountInformationPage.enterState("Ontario");
  await accountInformationPage.enterCity("Scarborough");
  await accountInformationPage.enterZipcode("M1T 3L9");
  await accountInformationPage.enterMobile("4373221885");
  await accountInformationPage.clickCreateAccount();

  // Verify that 'ACCOUNT Created!' is visible
  await expect(await accountCreatedDeletedPage.getAccountCreated()).toBeVisible();
  await accountCreatedDeletedPage.clickContinue();

  await homePage.clickDeleteAccount();

  // Verify that 'ACCOUNT DELETED!' is visible
  await expect(await accountCreatedDeletedPage.getAccountDeleted()).toBeVisible();

})