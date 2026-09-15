# Epicbet Playwright Test Automation

Playwright end-to-end test suite created for the Sisu Group QA Automation Engineer home assignment.

The suite covers important unauthenticated sportsbook flows using a maintainable Page Object / Component Object structure.

## Test Scenarios

The suite covers five scenarios:

1. User can access the sportsbook while unauthenticated.
2. User can navigate to a sport category.
3. User can add an available outcome to the betslip.
4. User can remove a selection from the betslip.
5. Unauthenticated user is prompted to log in when trying to place a bet.

Together, these scenarios cover the main guest flow from opening the sportsbook to the point where authentication is required.

## Tech Stack

- Playwright
- TypeScript
- Node.js
- GitHub Actions
- Playwright HTML reports

## Project Structure

```text
epicbet-playwright-tests/
├── .github/
│   └── workflows/
│       └── playwright.yml
├── src/
│   ├── components/
│   │   ├── Betslip.ts
│   │   ├── CookieBanner.ts
│   │   └── EventCard.ts
│   ├── config/
│   │   ├── environment.ts
│   │   ├── locale.ts
│   │   ├── sportCategories.ts
│   │   └── uiText.ts
│   ├── fixtures/
│   │   └── epicbet.fixture.ts
│   ├── pages/
│   │   └── SportsbookPage.ts
│   └── utils/
│       └── parseLocaleNumber.ts
├── tests/
│   ├── betslip.spec.ts
│   ├── betting-requires-login.spec.ts
│   ├── navigation.spec.ts
│   └── sportsbook-access.spec.ts
├── package.json
├── playwright.config.ts
├── tsconfig.json
└── README.md
```

## Architecture

`SportsbookPage` contains sportsbook-level actions such as opening the sportsbook, navigating to sport categories, and finding an event with an available outcome.

Reusable UI areas are represented by components:

- `CookieBanner`
- `EventCard`
- `Betslip`

A custom Playwright fixture provides `SportsbookPage` directly to the tests.

This keeps test files focused on user behaviour instead of locator and setup details.

## Test Data and Live Environment

The tests run against the live Epicbet sportsbook.

Matches and odds change continuously, so the tests do not use hardcoded teams, events, or odds. Instead, the framework finds an event that currently has an available outcome.

```ts
const event = await sportsbookPage.findBettableEvent();
const selection = await event.selectFirstEnabledOutcome();
```

Because the tests use a live production environment, execution can be affected by:

- live event availability;
- changing odds;
- geo restrictions;
- Cloudflare;
- production throttling.

The browser User-Agent includes the `SisuTestAssignment` value provided for the assignment.

The suite runs with `workers: 1` to reduce the risk of production throttling.

## Browser and Locale Configuration

The project is configured for:

- Chromium
- Firefox
- WebKit

Chromium is used as the main browser for the assignment.

Epicbet supports multiple locales. The framework separates locale-specific paths, UI text, and sport category mappings from the tests.

For this assignment, Estonian (`et`) is fully configured.

## Setup

Install dependencies:

```bash
npm ci
```

Install Playwright browsers:

```bash
npx playwright install
```

## Commands

Type check:

```bash
npm run typecheck
```

Run the main Chromium suite:

```bash
npm test
```

Run smoke tests:

```bash
npm run test:smoke
```

Run critical tests:

```bash
npm run test:critical
```

Run Firefox:

```bash
npm run test:firefox
```

Run WebKit:

```bash
npm run test:webkit
```

List tests:

```bash
npm run test:list
```

Open the Playwright report:

```bash
npm run report
```

## Environment Configuration

The default base URL is:

```text
https://epicbet.com
```

It can be overridden with `BASE_URL`.

PowerShell example:

```powershell
$env:BASE_URL="https://example-test-environment.com"
npm test
```

The test locale can be selected with `TEST_LOCALE`.

For example:

```powershell
$env:TEST_LOCALE="et"
npm test
```

## CI

GitHub Actions is configured to:

- run TypeScript validation and Chromium smoke tests for pull requests;
- run the full Chromium suite for pushes to `main`;
- allow manual execution with Chromium, Firefox, or WebKit.

Playwright HTML reports are uploaded by the workflow.

## Reporting and Debugging

The project uses Playwright HTML reporting.

On failure, the following artifacts are retained:

- trace;
- screenshot;
- video.

The tests use Playwright waiting and polling instead of fixed sleeps.

## Possible Future Improvements

- stable test data or a dedicated test environment;
- API-assisted test setup;
- automated nightly regression runs.

## Production Environment

The tests use the real Epicbet website instead of mocked responses.

Because of this, execution can be affected by:

- live event availability;
- changing odds;
- geo restrictions;
- Cloudflare;
- production throttling.

GitHub-hosted runners may be affected by Epicbet geo restrictions depending on runner location.

In a larger real project, I would use stable test data or a controlled test environment for the main regression suite and keep a smaller set of live production smoke tests.