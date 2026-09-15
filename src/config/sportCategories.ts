import {
  SupportedLocale,
  TEST_LOCALE,
} from './locale';

type SportCategory = {
  slug: string;
  linkName: string;
};

type SportCategories = {
  football: SportCategory;
  tennis: SportCategory;
  basketball: SportCategory;
};

const SPORT_CATEGORIES_BY_LOCALE: Partial<
  Record<SupportedLocale, SportCategories>
> = {
  et: {
    football: {
      slug: 'jalgpall',
      linkName: 'Jalgpall',
    },

    tennis: {
      slug: 'tennis',
      linkName: 'Tennis',
    },

    basketball: {
      slug: 'korvpall',
      linkName: 'Korvpall',
    },
  },
};

const configuredCategories =
  SPORT_CATEGORIES_BY_LOCALE[TEST_LOCALE];

if (!configuredCategories) {
  throw new Error(
    `Locale "${TEST_LOCALE}" is supported by the application, ` +
      'but its automated sport category mappings have not been configured yet.'
  );
}

export const SPORT_CATEGORIES: SportCategories =
  configuredCategories;