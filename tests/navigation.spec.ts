import { test, expect } from '../src/fixtures/epicbet.fixture';
import { SPORT_CATEGORIES } from '../src/config/sportCategories';
import { environment } from '../src/config/environment';
import { localePath } from '../src/config/locale';

test(
  'user can navigate to a sport category',
  {
    tag: ['@smoke'],
  },
  async ({ page, sportsbookPage }) => {
    await sportsbookPage.open();

    const { football } = SPORT_CATEGORIES;

    await sportsbookPage.openSportCategory(
      football.linkName
    );

    const footballLink =
      sportsbookPage.sportCategoryLink(
        football.linkName
      );

    await expect(page).toHaveURL(
      new URL(
        `${localePath}/sport/${football.slug}`,
        environment.baseURL
      ).toString()
    );

    await expect(
      footballLink
    ).toHaveClass(/selected/);

    await expect(
      sportsbookPage.eventCards.first()
    ).toBeVisible();
  }
);