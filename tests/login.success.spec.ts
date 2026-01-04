import { test, expect } from '@playwright/test';
import loginOrSignup from '../pages/login.singup.page';
import accountInformation from '../pages/account.information.page';
import accountCreatedDeleted from '../pages/account.created.deleted.page';
import home from '../pages/home.page';
import loginData from '../testdata/login.testdata.json';


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
  await loginSignupPage.enterName(loginData.validLogin.username);
  await loginSignupPage.enterEmailAddress(loginData.validLogin.email);
  await loginSignupPage.clickSignUp();

  // Enter Account Information
  await accountInformationPage.selectTitle(loginData.validLogin.validRegistration.title);
  await accountInformationPage.enterPassword(loginData.validLogin.password);
  await accountInformationPage.selectDay(loginData.validLogin.validRegistration.dateOfBirth.day);
  await accountInformationPage.selectMonth(loginData.validLogin.validRegistration.dateOfBirth.month);
  await accountInformationPage.selectYear(loginData.validLogin.validRegistration.dateOfBirth.year);

  // Address Information
  await accountInformationPage.enterFirstName(loginData.validLogin.validRegistration.firstName);
  await accountInformationPage.enterLastName(loginData.validLogin.validRegistration.lastName);
  await accountInformationPage.enterCompany(loginData.validLogin.validRegistration.company);
  await accountInformationPage.enterAddress(loginData.validLogin.validRegistration.address);
  await accountInformationPage.enterAddress2(loginData.validLogin.validRegistration.address2);
  await accountInformationPage.selectCountry(loginData.validLogin.validRegistration.country);
  await accountInformationPage.enterState(loginData.validLogin.validRegistration.state);
  await accountInformationPage.enterCity(loginData.validLogin.validRegistration.city);
  await accountInformationPage.enterZipcode(loginData.validLogin.validRegistration.zipcode);
  await accountInformationPage.enterMobile(loginData.validLogin.validRegistration.mobile);
  await accountInformationPage.clickCreateAccount();

  // Verify that 'ACCOUNT Created!' is visible
  await expect(await accountCreatedDeletedPage.getAccountCreated()).toBeVisible();
  await accountCreatedDeletedPage.clickContinue();

  await homePage.clickDeleteAccount();

  // Verify that 'ACCOUNT DELETED!' is visible
  await expect(await accountCreatedDeletedPage.getAccountDeleted()).toBeVisible();
});

test("Login User with incorrect email and password", async ({ page }) => {
  const loginSignupPage = new loginOrSignup(page);
  // Verify that home page is visible successfully
  expect(await loginSignupPage.getPageTitle()).toBe("Automation Exercise - Signup / Login");
  // verify 'Login to your account' is visible
  await expect(await loginSignupPage.verifyLoginToYourAccount()).toBeVisible();
  // Enter In-correct email address and password
  await loginSignupPage.enterEmailAddressLogin(loginData.invalidLogin.email);
  await loginSignupPage.enterPassword(loginData.invalidLogin.password);
  await loginSignupPage.clickLogin();
  // Verify Invalid User Name and Password
  expect(await loginSignupPage.getInvalidLoginMessage()).toEqual("Your email or password is incorrect!");
})


test("Logout user", async ({ page }) => {
  const loginSignupPage = new loginOrSignup(page);
  const accountInformationPage = new accountInformation(page);
  const accountCreatedDeletedPage = new accountCreatedDeleted(page);
  const homePage = new home(page);
  // Verify that home page is visible successfully
  expect(await loginSignupPage.getPageTitle()).toBe("Automation Exercise - Signup / Login");
  // verify 'Login to your account' is visible
  await expect(await loginSignupPage.verifyLoginToYourAccount()).toBeVisible();
  // Enter correct email address and password
  await loginSignupPage.enterName(loginData.logoutUser.username);
  await loginSignupPage.enterEmailAddress(loginData.logoutUser.email);
  await loginSignupPage.clickSignUp();

  // Enter Account Information
  await accountInformationPage.selectTitle("Mr.");
  await accountInformationPage.enterPassword(loginData.logoutUser.password);
  await accountInformationPage.selectDay(loginData.logoutUser.validRegistration.dateOfBirth.day);
  await accountInformationPage.selectMonth(loginData.logoutUser.validRegistration.dateOfBirth.month);
  await accountInformationPage.selectYear(loginData.logoutUser.validRegistration.dateOfBirth.year);

  // Address Information
  await accountInformationPage.enterFirstName(loginData.logoutUser.validRegistration.firstName);
  await accountInformationPage.enterLastName(loginData.logoutUser.validRegistration.lastName);
  await accountInformationPage.enterCompany(loginData.logoutUser.validRegistration.company);
  await accountInformationPage.enterAddress(loginData.logoutUser.validRegistration.address);
  await accountInformationPage.enterAddress2(loginData.logoutUser.validRegistration.address2);
  await accountInformationPage.selectCountry(loginData.logoutUser.validRegistration.country);
  await accountInformationPage.enterState(loginData.logoutUser.validRegistration.state);
  await accountInformationPage.enterCity(loginData.logoutUser.validRegistration.city);
  await accountInformationPage.enterZipcode(loginData.logoutUser.validRegistration.zipcode);
  await accountInformationPage.enterMobile(loginData.logoutUser.validRegistration.mobile);
  await accountInformationPage.clickCreateAccount();

  // Verify that 'ACCOUNT Created!' is visible
  await expect(await accountCreatedDeletedPage.getAccountCreated()).toBeVisible();
  await accountCreatedDeletedPage.clickContinue();

  // click 'Logout' button
  await homePage.clickLogout();

  // Verify that home page is visible successfully
  expect(await loginSignupPage.getPageTitle()).toBe("Automation Exercise - Signup / Login");
  // verify 'Login to your account' is visible
  await expect(await loginSignupPage.verifyLoginToYourAccount()).toBeVisible();
  // Enter correct email address and password
  await loginSignupPage.enterEmailAddressLogin(loginData.logoutUser.email);
  await loginSignupPage.enterPassword(loginData.logoutUser.password);
  await loginSignupPage.clickLogin();
  // Verify that 'Logged in as username' is visible
  expect(await homePage.getLoggedInCustomerName(loginData.logoutUser.username)).toContain(`Logged in as ${loginData.logoutUser.username}`);
  // click 'Logout' button
  await homePage.clickLogout();

  //Verify that user is navigated to login page
  expect(await loginSignupPage.getPageTitle()).toBe("Automation Exercise - Signup / Login");


   // Enter correct email address and password
  await loginSignupPage.enterEmailAddressLogin(loginData.logoutUser.email);
  await loginSignupPage.enterPassword(loginData.logoutUser.password);
  await loginSignupPage.clickLogin();

  // Delete Account
  await homePage.clickDeleteAccount();

  // Verify that 'ACCOUNT DELETED!' is visible
  await expect(await accountCreatedDeletedPage.getAccountDeleted()).toBeVisible();

})