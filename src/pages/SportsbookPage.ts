import { expect, Locator, Page } from '@playwright/test';
import { Betslip } from '../components/Betslip';
import { CookieBanner } from '../components/CookieBanner';
import { EventCard } from '../components/EventCard';
import { localePath } from '../config/locale';

export class SportsbookPage {
  readonly cookieBanner: CookieBanner;
  readonly betslip: Betslip;

  constructor(private readonly page: Page) {
    this.cookieBanner = new CookieBanner(page);
    this.betslip = new Betslip(page);
  }

  get eventCards(): Locator {
    return this.page.getByTestId('match-container');
  }

  get signupButton(): Locator {
    return this.page.getByTestId('signup-button');
  }

  sportCategoryLink(linkName: string): Locator {
    return this.page.getByRole('link', {
      name: linkName,
      exact: true,
    });
  }

  async open(): Promise<void> {
    await this.page.goto(`${localePath}/sport`);
    await this.prepareSportsbook();
  }

  async openSportCategory(
    linkName: string
  ): Promise<void> {
    await this.sportCategoryLink(linkName).click();
  }

  eventCard(index: number): EventCard {
    return new EventCard(
      this.eventCards.nth(index)
    );
  }

  async findBettableEvent(): Promise<EventCard> {
    const index = await this.waitForBettableEventIndex();

    return this.eventCard(index);
  }

  private async waitForBettableEventIndex(): Promise<number> {
    let index = -1;

    await expect
      .poll(
        async () => {
          index = await this.indexOfBettableEvent();
          return index;
        },
        {
          intervals: [500, 1_000, 2_000],
          message:
            'Waiting for a bettable sportsbook event',
        }
      )
      .not.toBe(-1);

    return index;
  }

  private async prepareSportsbook(): Promise<void> {
    await this.cookieBanner.acceptAll();

    await expect(
      this.eventCards.first()
    ).toBeVisible();

    await this.eventCards
      .first()
      .scrollIntoViewIfNeeded();
  }

  private indexOfBettableEvent(): Promise<number> {
    return this.page.evaluate(() => {
      const cards = Array.from(
        document.querySelectorAll(
          '[data-testid="match-container"]'
        )
      );

      return cards.findIndex((card) =>
        card.querySelector(
          '[data-testid="outcome-button"]:not([disabled])'
        )
      );
    });
  }
}