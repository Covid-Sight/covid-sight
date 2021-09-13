import { Selector } from 'testcafe';
import { navBar } from './navbar.component';

class LoginPage {
  constructor() {
    this.pageId = '#login-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.wait(15000).expect(this.pageSelector.exists).ok();
  }

  async gotoRegister(testController) {
    await testController.click('#signup');
  }

  /** Fills out and submits the form to login, then checks to see that login was successful. */
  async login(testController, username, password) {
    await this.isDisplayed(testController);
    await testController.typeText('#login-form-email', username);
    await testController.typeText('#login-form-password', password);
    await testController.click('#login-form-submit');
    await navBar.isLoggedIn(testController, username);
  }
}

export const loginPage = new LoginPage();
