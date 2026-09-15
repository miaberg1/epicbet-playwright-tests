import { test } from '../src/fixtures/epicbet.fixture';

test(
  'unauthenticated user is prompted to log in when placing a bet',
  {
    tag: ['@critical'],
  },
  async ({ sportsbookPage }) => {

    await sportsbookPage.open();

    const event = await sportsbookPage.findBettableEvent();

    const selection =
      await event.selectFirstEnabledOutcome();

    await sportsbookPage.betslip.expectSelection(selection);

    const stake = 1;

    await sportsbookPage.betslip.selectQuickStake(stake);
    await sportsbookPage.betslip.expectStakeValue(stake);

    await sportsbookPage.betslip.attemptToPlaceBet();
    await sportsbookPage.betslip.expectLoginPromptVisible();
  }
);