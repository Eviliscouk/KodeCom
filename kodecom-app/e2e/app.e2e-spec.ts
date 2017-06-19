import { KodecomAppPage } from './app.po';

describe('kodecom-app App', () => {
  let page: KodecomAppPage;

  beforeEach(() => {
    page = new KodecomAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
