const { GeneralPage } = require("./base.page");

class SettingsPage extends GeneralPage {
  constructor(page) {
    super(page);
    this.$logout = page.locator("text=Or click here to logout");
  }

  async logout() {
    await this.$logout.click();
  }
}

module.exports = { SettingsPage };
