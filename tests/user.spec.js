const { test, expect } = require("@playwright/test");
const { faker } = require("@faker-js/faker");
const pages = require("../pages/app.page");

const baseUrl = "http://127.0.0.1:8000/";

test.describe("user management", () => {
  test("should sign up, log out, and log in user", async ({ page }) => {
    const name = faker.name.findName();
    const email = faker.internet.email();
    const password = faker.datatype.string();

    // open the application
    await page.goto(baseUrl);
    const homePage = new pages.HomePage(page);

    // go to register page, create a new user, and check
    await homePage.toSignUp();
    const registerPage = new pages.RegisterPage(page);
    await registerPage.registerUser({ name, email, password });
    await expect(homePage.mainNavBar.$userProfile(name)).toBeVisible();
    await expect(homePage.$myArticles).toBeVisible();

    // go to settings page, logout, and check
    await registerPage.toSettings();
    const settingsPage = new pages.SettingsPage(page);
    await settingsPage.logout();
    await expect(homePage.mainNavBar.$userProfile(name)).not.toBeVisible();
    await expect(homePage.$myArticles).not.toBeVisible();
    await expect(homePage.mainNavBar.$signUp).toBeVisible();
    await expect(homePage.mainNavBar.$signIn).toBeVisible();

    // log in again, and check
    await homePage.toSignIn();
    const loginPage = new pages.LoginPage(page);
    await loginPage.login({ email, password });
    await expect(homePage.mainNavBar.$userProfile(name)).toBeVisible();
    await expect(homePage.$myArticles).toBeVisible();
  });
});
