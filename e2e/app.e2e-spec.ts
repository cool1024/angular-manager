import { AngularManagerPage } from './app.po';

describe('angular-manager App', () => {
  let page: AngularManagerPage;

  beforeEach(() => {
    page = new AngularManagerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
