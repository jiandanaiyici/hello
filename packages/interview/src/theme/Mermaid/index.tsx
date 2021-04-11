// https://github.com/facebook/docusaurus/issues/1258
// 没有找到可以配置的插件, 本应该在 config 文件中添加 remarkPlugins
// https://github.com/facebook/docusaurus/blob/bc7c06ee378ee57e9cdf06dda7a65a02f98208c6/packages/docusaurus-mdx-loader/src/index.js#L32
// https://v2.docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-docs
// https://mermaid-js.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoiZ3JhcGggVERcbiAgICBBW1RoaXMgaXMgYW4gPGI-aW1wb3J0YW50PC9iPiA8YSBocmVmPSdodHRwczovL2dvb2dsZS5jb20nPmxpbms8L2E-XVxuIiwibWVybWFpZCI6eyJ0aGVtZSI6ImRlZmF1bHQifSwidXBkYXRlRWRpdG9yIjpmYWxzZX0

import React, { useEffect } from 'react';
import mermaid from 'mermaid';

mermaid.initialize({
  startOnLoad: true,
  arrowMarkerAbsolute: true,
});

const Mermaid = ({ chart }) => {
  useEffect(() => {
    mermaid.contentLoaded();
  }, []);
  return <div className="mermaid">{chart}</div>;
};

export default Mermaid;
