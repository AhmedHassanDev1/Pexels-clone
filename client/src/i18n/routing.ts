import {defineRouting} from 'next-intl/routing';
 
export const routing = defineRouting({

  locales: ['en', 'de','fr','ja','it','ru','tr','sv','zh','es'],
 
  defaultLocale: 'en',
  localeDetection: false
});