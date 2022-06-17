const pages = require("../pages/index.page");

const Navigate = {
  async toRegister(page) {
    await page.toSignUp();
  },

  async toLogin(page) {
    await page.toSignIn();
  },

  async toHome(page, tab) {
    await page.toHome();
    if (tab) {
      const home = page.cast(pages.home.HomePage);
      await home.toTab(tab);
    }
  },

  async toSettings(page) {
    await page.toSettings();
  },
};

module.exports = { Navigate };
