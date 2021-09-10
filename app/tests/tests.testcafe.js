import { homePage } from './home.page';
import { loginPage } from './login.page';
import { signoutPage } from './signout.page';
import { signupPage } from './signup.page';
import { navBar } from './navbar.component';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'john@foo.com', password: 'changeme' };
const newCreds = { username: 'tu@foo.com', firs: 'test', last: 'user', id: '12345612', password: 'gottem' };

fixture('meteor-application-template-react localhost test with default db')
  .page('http://localhost:3000');

test('Test that login page shows up', async (testController) => {
  await loginPage.isDisplayed(testController);
  await testController.wait(500);
  await loginPage.login(testController, credentials.username, credentials.password);
});

test('Test that signup page shows up', async (testController) => {
  await loginPage.isDisplayed(testController);
  await testController.wait(500);
  await loginPage.gotoRegister(testController);
  await signupPage.isDisplayed(testController);
  await testController.wait(500);
  await signupPage.signupUser(testController, newCreds.username, newCreds.firs, newCreds.last, newCreds.id, newCreds.password);
});

test('Test that signed in landing page works and signout work', async (testController) => {
  // await navBar.gotoSigninPage(testController);
  // await signinPage.signin(testController, credentials.username, credentials.password);
  await loginPage.login(testController, credentials.username, credentials.password);
  await testController.wait(500);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.gotoHomePage(testController, credentials.username);
  await homePage.isDisplayed(testController);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});
