import { test, expect } from '../src/fixtures/epicbet.fixture';
import { environment } from '../src/config/environment';
import { localePath } from '../src/config/locale';

test(
  'user can access the sportsbook while unauthenticated',
  {
    tag: ['@smoke', '@critical'],
  },
  async ({ page, sportsbookPage }) => {
    await sportsbookPage.open();

    await expect(page).toHaveURL(
      new URL(`${localePath}/sport`, environment.baseURL).toString()
    );

    await expect(sportsbookPage.signupButton).toBeVisible();

    await expect(
      sportsbookPage.eventCards.first()
    ).toBeVisible();
  }
);