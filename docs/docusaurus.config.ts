import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'The Node Forge',
  tagline:
    'A lightweight and efficient library for validating URLs. It ensures that URLs are correctly formatted and provides an optional feature to check whether a URL is live by sending an HTTP request. This package is designed for web applications, APIs, and services that require reliable URL validation',
  favicon: 'img/favicon.ico',

  url: 'https://the-node-forge.github.io',
  baseUrl: '/url-validator/',
  trailingSlash: false,

  organizationName: 'The-Node-Forge',
  projectName: 'url-validator',
  deploymentBranch: 'gh-pages',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.ts'),
          editUrl: 'https://github.com/The-Node-Forge/url-validator/tree/main/docs/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl: 'https://github.com/The-Node-Forge/url-validator/tree/main/docs/',
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/theNodeForge.png', // Edit
    navbar: {
      title: 'The Node Forge', // Your Package Name
      logo: {
        alt: 'The Node Forge Logo', // edit
        src: 'img/theNodeForge.png', // Your Logo
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Docs',
        },

        // {
        //   type: 'docSidebar',
        //   sidebarId: 'apiSidebar',
        //   position: 'left',
        //   label: 'API',
        // },
        // uncomment to enable blogs
        // { to: '/blog', label: 'Blog', position: 'left' },
        {
          href: 'https://github.com/The-Node-Forge/url-validator',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'API',
              to: '/docs/intro/',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/The-Node-Forge/url-validator',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} The Node Forge. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,

  plugins: [
    [
      'docusaurus-plugin-typedoc',
      {
        entryPoints: ['../src/index.ts'],
        tsconfig: '../tsconfig.json',
        out: 'docs/api',
        includeVersion: true,
        hideGenerator: true,
        categorizeByGroup: true,
        excludePrivate: true,
        excludeProtected: true,
        excludeExternals: true,
        excludeNotDocumented: true, // Exclude code without JSDoc comments
        plugin: ['typedoc-plugin-markdown'],
      },
    ],
  ],
};

export default config;
