const { GeneralPage } = require("./base.page");

class RegisterPage extends GeneralPage {
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

module.exports = { RegisterPage };
