import {
  Locator,
  Page,
} from '@playwright/test';

import { uiText } from '../config/uiText';

export class CookieBanner {
  private readonly acceptAllButton: Locator;

  constructor(page: Page) {
    this.acceptAllButton = page.getByRole('button', {
      name: uiText.acceptCookies,
      exact: true,
    });
  }

  async acceptAll(): Promise<void> {
    try {
      await this.acceptAllButton.waitFor({
        state: 'visible',
        timeout: 10_000,
      });
    } catch (error) {
      if (
        error instanceof Error &&
        error.name === 'TimeoutError'
      ) {
        return;
      }

      throw error;
    }

    await this.acceptAllButton.click();
  }
}