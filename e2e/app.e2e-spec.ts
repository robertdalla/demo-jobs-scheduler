import { PdPPage } from './app.po';

describe('pd-p App', () => {
  let page: PdPPage;

  beforeEach(() => {
    page = new PdPPage();
  });

  it('should display \'Jobs Scheduler demo\'', () => {
    page.navigateTo();
    const expectedOutput = 'Jobs Scheduler demo';
    expect(page.getApplicationTitle() as unknown).toEqual(expectedOutput);
  });
});
