export type SupportedLocale =
  | 'et'
  | 'en'
  | 'fi'
  | 'es'
  | 'is'
  | 'ru';

export const SUPPORTED_LOCALES: SupportedLocale[] = [
  'et',
  'en',
  'fi',
  'es',
  'is',
  'ru',
];

export const DEFAULT_LOCALE: SupportedLocale = 'et';

const requestedLocale =
  (process.env.TEST_LOCALE ?? DEFAULT_LOCALE) as SupportedLocale;

if (!SUPPORTED_LOCALES.includes(requestedLocale)) {
  throw new Error(
    `Unsupported TEST_LOCALE "${requestedLocale}". ` +
      `Supported locales: ${SUPPORTED_LOCALES.join(', ')}`
  );
}

export const TEST_LOCALE = requestedLocale;
export const localePath = `/${TEST_LOCALE}`;