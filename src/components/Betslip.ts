import {
  expect,
  Locator,
  Page,
} from '@playwright/test';

import { uiText } from '../config/uiText';
import { parseLocaleNumber } from '../utils/parseLocaleNumber';
import { SelectedOutcome } from './EventCard';

export class Betslip {
  readonly selectionsCount: Locator;
  readonly totalOdds: Locator;
  readonly quickbetContainer: Locator;
  readonly stakeInput: Locator;
  readonly placeBetButton: Locator;
  readonly loginPrompt: Locator;

  constructor(
    private readonly page: Page
  ) {
    this.selectionsCount =
      page.getByTestId('selections-count');

    this.totalOdds =
      page.getByTestId('total-odds');

    this.quickbetContainer =
      page.getByTestId('quickbet-container');

    this.stakeInput =
      page.getByTestId('stake-input');

    this.placeBetButton =
      page.getByTestId('place-bet-button');

    this.loginPrompt = page.getByText(
      uiText.loginPrompt,
      {
        exact: false,
      }
    );
  }

  private removeSelectionButton(): Locator {
    return this.page.getByTestId(
      'betslip-remove-selection-button'
    );
  }

  async expectSelectionsCount(
    count: number
  ): Promise<void> {
    await expect(
      this.selectionsCount
    ).toHaveText(String(count));
  }

  async expectSelection(
    selection: SelectedOutcome
  ): Promise<void> {
    await this.expectSelectionsCount(1);

    await expect(
      this.quickbetContainer
    ).toContainText(
      selection.outcomeName
    );

    await expect(
      this.totalOdds
    ).toBeVisible();

    const displayedOdds = parseLocaleNumber(
      await this.totalOdds.innerText()
    );

    expect(
      displayedOdds,
      'Betslip total odds should match the selected outcome odds'
    ).toBe(selection.odds);
  }

  async removeFirstSelection(): Promise<void> {
    await this.removeSelectionButton()
      .first()
      .click();
  }

  async expectEmpty(): Promise<void> {
    await expect(
      this.quickbetContainer
    ).toBeHidden();
  }

  async selectQuickStake(
    amount: number
  ): Promise<void> {
    const quickStakeButton =
      this.page.getByRole(
        'button',
        {
          name: `+ ${amount}`,
          exact: true,
        }
      );

    await expect(
      quickStakeButton
    ).toBeVisible();

    await expect(
      quickStakeButton
    ).toBeEnabled();

    await quickStakeButton.click();
  }

  async expectStakeValue(
    amount: number
  ): Promise<void> {
    await expect(
      this.stakeInput
    ).toBeVisible();

    const actualStake = parseLocaleNumber(
      await this.stakeInput.inputValue()
    );

    expect(
      actualStake,
      'Stake input should contain the selected quick stake amount'
    ).toBe(amount);
  }

  async attemptToPlaceBet(): Promise<void> {
    await expect(
      this.placeBetButton
    ).toBeEnabled();

    await this.placeBetButton.click();
  }

  async expectLoginPromptVisible(): Promise<void> {
    await expect(
      this.loginPrompt
    ).toBeVisible();
  }
}