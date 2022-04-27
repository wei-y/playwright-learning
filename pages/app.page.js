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

class RegisterPage extends BasePage {
  constructor(page) {
    super(page);
    this.$name = page.locator("id=id_name");
    this.$email = page.locator("id=id_email");
    this.$password = page.locator("id=id_password");
    this.$submit = page.locator("button[type=submit]");
  }

  async registerUser(attrs) {
    await this.$name.type(attrs.name);
    await this.$email.type(attrs.email);
    await this.$password.type(attrs.password);
    await this.$submit.click();
  }
}

class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.$myArticles = page.locator("css=main .nav-item >> text=My Articles");
  }
}

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.$email = page.locator("id=id_username");
    this.$password = page.locator("id=id_password");
    this.$submit = page.locator("button[type=submit]");
  }

  async login(attrs) {
    await this.$email.type(attrs.email);
    await this.$password.type(attrs.password);
    await this.$submit.click();
  }
}

class SettingsPage extends BasePage {
  constructor(page) {
    super(page);
    this.$logout = page.locator("text=Or click here to logout");
  }

  async logout() {
    await this.$logout.click();
  }
}

module.exports = {
  RegisterPage,
  HomePage,
  LoginPage,
  SettingsPage,
};
