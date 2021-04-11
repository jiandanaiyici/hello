const rehypePrism = require('@mapbox/rehype-prism');
// const withLess = require('@zeit/next-less');
// const lessToJS = require('less-vars-to-js');
// const fs = require('fs');
// const path = require('path');

const withMDX = require('@next/mdx')
  ({
    extension: /\.(md|mdx)$/,
    options: {
      remarkPlugins: [],
      rehypePlugins: [rehypePrism]
    }
  });


// Where your antd-custom.less file lives
// const themeVariables = lessToJS(
//   fs.readFileSync(path.resolve(__dirname, './styles/antd-custom.less'), 'utf8')
// );

/** 这里需要添加 @zeit/next-css */
// const withLessConfig = withLess({
//   cssModules: true,
//   lessLoaderOptions: {
//     javascriptEnabled: true,
//     modifyVars: themeVariables, // make your antd custom effective
//   },
//   webpack: (config, { isServer }) => {
//     if(isServer) {
//       const antStyles = /antd\/.*?\/style.*?/;
//       const origExternals = [...config.externals];
//       config.externals = [
//         (context, request, callback) => {
//           if(request.match(antStyles)) return callback();
//           if(typeof origExternals[0] === 'function') {
//             origExternals[0](context, request, callback);
//           } else {
//             callback();
//           }
//         },
//         ...(typeof origExternals[0] === 'function' ? [] : origExternals),
//       ];

//       config.module.rules.unshift({
//         test: antStyles,
//         use: 'null-loader',
//       });
//     }
//     return config;
//   },
// });


module.exports = withMDX({
    // ...withLessConfig,
    compress: false,
    pageExtensions: ['mdx', 'jsx', 'js', 'ts', 'tsx', 'md'],
    exportPathMap: async function (
      defaultPathMap,
      { dev, dir, outDir, distDir, buildId }
    ) {
      return {
        '/': { page: '/' },
        '/about': { page: '/about' },
      };
    },
  });
