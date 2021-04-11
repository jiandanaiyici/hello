### Vite

> 目前使用 vite 创建了两个不同框架的项目, 分别是 `react-vite` 和 `vite-vue`, 如果没有安装 [yarn](https://yarnpkg.com/getting-started/install) 自行安装, 使用 1.x 版本即可

Node 版本 v12.5.0 不能使用 [v13.x 会报错](https://github.com/babel/babel/issues/10595), 目前还未解决

```bash
npm install -g yarn
```

#### 文档

```bash
yarn 

yarn dev

# 部署
npm install -g surge

npm run deploy:surge
```

> 打开 [http://localhost:8080/hello-vue/](http://localhost:8080/hello-vue/) 进行访问

#### React

> React 16.8 + TS

```bash
cd react-vite
# 安装
yarn

yarn dev
```

#### Vue

> vue3 + TS

```bash
cd vite-vue

yarn

yarn dev
```
