class MainNavBar {
  constructor(page, locator) {
    // reference to the page and the component element
    this.page = page;
    this.$origin = locator;

    // locate elements in the component
    this.$signUp = this.$origin.locator("text=Sign up");
    this.$signIn = this.$origin.locator("text=Sign in");
    this.$settings = this.$origin.locator("text=Settings");
    this.$home = this.$origin.locator("text=Home");
    this.$userProfile = (userName) => this.$origin.locator(`text=${userName}`);
  }
}

class BasePage {
  constructor(page) {
    this.page = page;
  }

  cast(pageType) {
    return new pageType(this.page);
  }
}

class GeneralPage extends BasePage {
  constructor(page) {
    super(page);

    // we find the container of the nav bar and make a component object from it
    const $navBar = page.locator("css=nav .navbar-nav");
    this.mainNavBar = new MainNavBar(page, $navBar);
  }

  async toHome() {
    await this.mainNavBar.$home.click();
  }
  async toSignUp() {
    await this.mainNavBar.$signUp.click();
  }
  async toSignIn() {
    await this.mainNavBar.$signIn.click();
  }
  async toSettings() {
    await this.mainNavBar.$settings.click();
  }
  async toProfile(user) {
    await this.mainNavBar.$userProfile(user).click();
  }
}

module.exports = { BasePage, GeneralPage };
