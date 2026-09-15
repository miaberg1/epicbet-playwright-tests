import { Locator } from '@playwright/test';
import { parseLocaleNumber } from '../utils/parseLocaleNumber';

export type SelectedOutcome = {
  outcomeName: string;
  odds: number;
};

export class EventCard {
  constructor(private readonly root: Locator) {}

  private get enabledOutcomes(): Locator {
    return this.root
      .getByTestId('outcome-button')
      .and(this.root.locator(':not([disabled])'));
  }

  async selectFirstEnabledOutcome(): Promise<SelectedOutcome> {
    const outcome = this.enabledOutcomes.first();

    await outcome.scrollIntoViewIfNeeded();

    const text = (await outcome.innerText())
      .trim()
      .split('\n')
      .map((value) => value.trim())
      .filter(Boolean);

    if (text.length < 2) {
      throw new Error(
        'Unable to determine outcome name and odds.'
      );
    }

    const outcomeName = text[0];
    const odds = parseLocaleNumber(text[text.length - 1]);

    await outcome.click();

    return {
      outcomeName,
      odds,
    };
  }
}