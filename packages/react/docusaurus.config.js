/**
 * 更多参考: https://www.docusaurus.cn/docs/theme-classic
 */

module.exports = {
  title: 'Hello React',
  tagline: '记录你的React',
  url: 'https://your-docusaurus-test-site.com',
  baseUrl: '/',
  /** 打包时出现有链接无法访问时 */
  onBrokenLinks: 'warn',
  /** 当检测到有重复访问链接时 */
  // onDuplicateRoutes: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'niexiaofei1988', // Usually your GitHub org/user name.
  projectName: 'hello-react',
  themes: ['@docusaurus/theme-live-codeblock'],
  // scripts: ['https://cdnjs.cloudflare.com/ajax/libs/screenfull.js/5.0.2/screenfull.min.js'],
  stylesheets: ['https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css'],
  themeConfig: {
    hideOnScroll: true,
    colorMode: {
      /** 默认颜色主题为 light */
      defaultMode: 'light',
      /** 禁止切换颜色主题 */
      disableSwitch: false,
    },
    navbar: {
      title: 'Hello React',
      logo: {
        alt: 'Hello React Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          to: 'docs/overview',
          activeBasePath: 'docs',
          label: '文档',
          position: 'left',
        },
        { to: 'blog', label: '记录', position: 'right' },
        {
          href: 'https://github.com/jiandanaiyici/hello/tree/main/packages/react',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'light',
      links: [],
      // copyright: `Copyright © ${new Date().getFullYear()}`,
    },
    prism: {
      theme: require('prism-react-renderer/themes/dracula'),
      darkTheme: require('prism-react-renderer/themes/vsDark'),
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        // debug: undefined,
        docs: {
          // routeBasePath: '/',
          path: 'docs',
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/niexiaofei1988/hello/tree/main/packages/react',
        },
        blog: {
          blogDescription: 'A docusaurus powered blog!',
          showReadingTime: true,
        },
        // sitemap: false,
        // pages: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
