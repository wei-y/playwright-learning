const { GeneralPage } = require("./base.page");

class HomePage extends GeneralPage {
  constructor(page) {
    super(page);
    this.$myArticles = page.locator("css=main .nav-item >> text=My Articles");
  }
}

module.exports = { HomePage };
