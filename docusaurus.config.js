import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Valydar',
  tagline: 'Identity verification platform for developers',
  favicon: 'img/favicon.ico',

  future: { v4: true },

  url: 'https://docs.valydar.com',
  baseUrl: '/',

  organizationName: 'valydar',
  projectName: 'valydar',

  onBrokenLinks: 'throw',
  markdown: { hooks: { onBrokenMarkdownLinks: 'warn' } },

  i18n: { defaultLocale: 'en', locales: ['en'] },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          editUrl: 'https://github.com/valydar/docs.valydar.com/edit/main/',
        },
        blog: false,
        theme: { customCss: './src/css/custom.css' },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: { respectPrefersColorScheme: true },
      navbar: {
        title: 'Valydar',
        logo: { alt: 'Valydar', src: 'img/logo.svg' },
        items: [
          { type: 'docSidebar', sidebarId: 'guideSidebar', position: 'left', label: 'Guides' },
          { type: 'docSidebar', sidebarId: 'apiSidebar', position: 'left', label: 'API Reference' },
          { href: 'https://portal.valydar.com', label: 'Get API Key', position: 'right' },
          { href: 'https://github.com/valydar/api', label: 'GitHub', position: 'right' },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              { label: 'Getting Started', to: '/docs/intro' },
              { label: 'API Reference', to: '/docs/api/verifications' },
              { label: 'Web SDK', to: '/docs/sdk/web' },
            ],
          },
          {
            title: 'Community',
            items: [
              { label: 'GitHub', href: 'https://github.com/valydar/api' },
              { label: 'Discord', href: '#' },
            ],
          },
          {
            title: 'More',
            items: [
              { label: 'Portal', href: 'https://portal.valydar.com' },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Valydar Software B.V. Amsterdam, The Netherlands.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['bash', 'json', 'rust', 'python', 'go', 'java', 'csharp'],
      },
    }),
};

export default config;
