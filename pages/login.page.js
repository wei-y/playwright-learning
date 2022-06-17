const { GeneralPage } = require("./base.page");

class LoginPage extends GeneralPage {
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

module.exports = { LoginPage };
