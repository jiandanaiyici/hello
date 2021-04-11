/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: '前端面试',
  url: 'https://github.com/niexiaofei1988/hello-interview',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'niexiaofei1988',
  projectName: 'hello-interview',
  // themes: ['@docusaurus/theme-live-codeblock'],
  themeConfig: {
    colorMode: {
      defaultMode: 'light',
      disableSwitch: true,
    },
    // sidebarCollapsible: false,
    hideableSidebar: true,
    prism: {
      theme: require('prism-react-renderer/themes/dracula'),
      darkTheme: require('prism-react-renderer/themes/dracula'),
    },
    navbar: {
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.svg',
      },
      items: [
        { to: 'docs', label: '面试题', position: 'left' },
        {
          to: '/algorithm/resource',
          label: '算法&数据结构',
          position: 'right',
        },
        {
          to: '/designpatterns/resource',
          label: '设计模式',
          position: 'right',
        },
        { to: 'blog', label: 'Blog', position: 'right' },
        { to: 'resource/index', label: '推荐资源', position: 'right' },
        {
          href: 'https://github.com/niexiaofei1988/hello-interview',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./routes/sidebars.js'),
          editUrl:
            'https://github.com/niexiaofei1988/hello-interview/tree/main',
          // showLastUpdateAuthor: true,
          // showLastUpdateTime: true,
        },
        algorithm: {
          sidebarPath: require.resolve('./routes/algorithm.js'),
        },
        // sitemap: {},
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'algorithm',
        path: 'algorithm',
        routeBasePath: 'algorithm',
        sidebarPath: require.resolve('./routes/algorithm.js'),
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'designpatterns',
        path: 'designpatterns',
        routeBasePath: 'designpatterns',
        sidebarPath: require.resolve('./routes/designpatterns.js'),
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'resource',
        path: 'resource',
        routeBasePath: 'resource',
        sidebarPath: require.resolve('./routes/resource.js'),
      },
    ],
    //   '@docusaurus/plugin-client-redirects',
  ],
};
