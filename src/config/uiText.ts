import { SupportedLocale, TEST_LOCALE } from './locale';

type UiText = {
  acceptCookies: string;
  loginPrompt: string;
};

const UI_TEXT: Partial<Record<SupportedLocale, UiText>> = {
  et: {
    acceptCookies: 'Luba kõik',
    loginPrompt: 'Vali sisse logimise viis',
  },
};

export function getUiText(): UiText {
  const text = UI_TEXT[TEST_LOCALE];

  if (!text) {
    throw new Error(
      `UI text configuration for locale "${TEST_LOCALE}" ` +
        'has not been added yet.'
    );
  }

  return text;
}

export const uiText = getUiText();