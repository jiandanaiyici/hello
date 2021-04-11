const githubUrl = 'https://github.com/niexiaofei1988/hello-chart';
const siteUrl = 'https://hello-charts.surge.sh/';

module.exports = {
  title: '图表',
  tagline: '',
  url: siteUrl,
  baseUrl: '/',
  onBrokenLinks: 'throw',
  favicon: 'img/avatar.jpeg',
  projectName: 'hello-charts',
  themeConfig: {
    prism: {
      theme: require('prism-react-renderer/themes/duotoneDark'),
    },
    navbar: {
      title: '图表',
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        { to: 'blog', label: 'Blog', position: 'left' },
        {
          href: githubUrl,
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    //   footer: {
    //     style: 'dark',
    //     links: [
    //       {
    //         title: 'Docs',
    //         items: [
    //           {
    //             label: 'L7',
    //             to: 'docs/',
    //           }, {
    //             label: 'L8',
    //             to: 'docs/l8',
    //           },
    //         ],
    //       },
    //       {
    //         title: 'More',
    //         items: [
    //           {
    //             label: 'GitHub',
    //             href: githubUrl,
    //           },
    //         ],
    //       },
    //     ],
    //     // copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
    //   },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      // 参考: https://github.com/facebook/docusaurus/blob/master/website/docusaurus.config.js
      {
        docs: {
          homePageId: 'L7-API',
          sidebarPath: require.resolve('./sidebars.js'),
          // editUrl:
          //   'https://github.com/facebook/docusaurus/edit/master/website/',
        },
        blog: {
          showReadingTime: true,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
