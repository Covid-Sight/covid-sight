import { Selector } from 'testcafe';

class AddVaccinePage {
  constructor() {
    this.pageId = '#add-vaccination';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.wait(10000).expect(this.pageSelector.exists).ok();
  }

  async testAdd(testController, fullName, id, date1, clinic1, date2, clinic2) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await this.isDisplayed(testController);
    await testController.typeText('#name', fullName);
    await testController.typeText('#id', id);
    await testController.typeText('#date1', date1).expect(Selector('#date1').value).eql(date1);
    await testController.typeText('#id', clinic1);
    await testController.typeText('#date2', date2).expect(Selector('#date2').value).eql(date2);
    await testController.typeText('#id', clinic2);
    await testController.click('#add');
  }
}

export const addVaccinePage = new AddVaccinePage();
