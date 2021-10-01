import { Selector } from 'testcafe';

class CheckInPage {
  constructor() {
    this.pageId = '#check-in-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.wait(5000).expect(this.pageSelector.exists).ok();
  }
}

export const checkInPage = new CheckInPage();
