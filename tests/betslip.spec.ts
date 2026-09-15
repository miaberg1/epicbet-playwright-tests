import { test } from '../src/fixtures/epicbet.fixture';

test.describe('Betslip', () => {
  test(
    'user can add an outcome to the betslip',
    {
      tag: ['@critical'],
    },
    async ({ sportsbookPage }) => {
      await sportsbookPage.open();

      const event = await sportsbookPage.findBettableEvent();

      const selection =
        await event.selectFirstEnabledOutcome();

      await sportsbookPage.betslip.expectSelection(selection);
    }
  );

  test(
    'user can remove a selection from the betslip',
    {
      tag: ['@regression'],
    },
    async ({ sportsbookPage }) => {
      await sportsbookPage.open();

      const event = await sportsbookPage.findBettableEvent();

      const selection =
        await event.selectFirstEnabledOutcome();

      await sportsbookPage.betslip.expectSelection(selection);

      await sportsbookPage.betslip.removeFirstSelection();

      await sportsbookPage.betslip.expectEmpty();
    }
  );
});