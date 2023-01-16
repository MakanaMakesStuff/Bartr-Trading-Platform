const { withFaust, getWpHostname } = require('@faustwp/core');

/**
 * @type {import('next').NextConfig}
 **/
module.exports = withFaust({
  reactStrictMode: true,
  sassOptions: {
    includePaths: ['node_modules'],
  },
  images: {
    domains: [getWpHostname()],
  },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  env: {
    NEXT_PUBLIC_WORDPRESS_URL: "https://expecttoptensdotcom.wpcomstaging.com",
    FAUSTWP_SECRET_KEY: "92124dd5-c7d5-4f66-bb92-7f7b403e26b6"
  }
});
