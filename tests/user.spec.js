const { test, expect } = require("@playwright/test");
const { faker } = require("@faker-js/faker");

const baseUrl = "http://127.0.0.1:8000/";

test.describe("user management", () => {
  test("should sign up, log out, and log in user", async ({ page }) => {
    const userName = faker.name.findName();
    const userEmail = faker.internet.email();
    const userPassword = faker.datatype.string();

    // open the application
    await page.goto(baseUrl);

    // click sign up, fill information, and submit
    const signUpButton = page.locator("css=nav .navbar-nav >> text=Sign up");
    await signUpButton.click();
    await page.locator("id=id_name").type(userName);
    await page.locator("id=id_email").type(userEmail);
    await page.locator("id=id_password").type(userPassword);
    await page.locator("button[type=submit]").click();

    // verify user is signed in
    const userProfile = page.locator(`css=nav .nav-item >> text=${userName}`);
    const myArticle = page.locator("css=main .nav-item >> text=My Articles");
    await expect(userProfile).toBeVisible();
    await expect(myArticle).toBeVisible();

    // log out
    await page.locator("css=nav .nav-item >> text=Settings").click();
    await page.locator("text=Or click here to logout").click();

    // verify that user is logged out
    const signInButton = page.locator("css=nav .navbar-nav >> text=Sign in");
    await expect(userProfile).not.toBeVisible();
    await expect(myArticle).not.toBeVisible();
    await expect(signUpButton).toBeVisible();
    await expect(signInButton).toBeVisible();

    // log in again
    await signInButton.click();
    await page.locator("id=id_username").type(userEmail);
    await page.locator("id=id_password").type(userPassword);
    await page.locator("button[type=submit]").click();

    // verify that user is logged in
    await expect(userProfile).toBeVisible();
    await expect(myArticle).toBeVisible();
  });
});
