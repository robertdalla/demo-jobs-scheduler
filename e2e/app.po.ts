import { browser, element, by } from 'protractor';

export class PdPPage {
  navigateTo() {
    return browser.get('/');
  }

  // function to get the title of the application
  getApplicationTitle() {
    return browser.getTitle();
  }
}
