- [文档](https://hello-react.surge)
- [示例预览](https://hello-react-examples.surge.sh/#/)

# Website

[Docusaurus 2](https://v2.docusaurus.io/): `React` 静态站点生成器

```bash
# 安装
npm install

# 启动
npm start

# 输出 build 文件夹
yarn build

# 部署 surge
npm run surge

# 部署示例 hello-react-examples.surge
yarn surge-examples
```

### 部署

```
$ GIT_USER=<Your GitHub username> USE_SSH=true yarn deploy
```

<!-- If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch. -->

### 部署报错

- [Minify failure when building docusaurus site in a yarn workspaces with another project #3515](https://github.com/facebook/docusaurus/issues/3515)

node: 14.10

```json
  "@docusaurus/core": "^2.0.0-alpha.61",
  "@docusaurus/preset-classic": "^2.0.0-alpha.61",
  "@docusaurus/theme-live-codeblock": "^2.0.0-alpha.39"
```