import {
  test as base,
  expect,
} from '@playwright/test';

import { SportsbookPage } from '../pages/SportsbookPage';

type EpicbetFixtures = {
  sportsbookPage: SportsbookPage;
};

export const test = base.extend<EpicbetFixtures>({
  sportsbookPage: async ({ page }, use) => {
    await use(new SportsbookPage(page));
  },
});

export { expect };