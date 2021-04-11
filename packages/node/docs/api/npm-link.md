# npm-link

> 试想一下在现在的项目管理中大多使用的包基于 `npm` 进行管理, 当使用某一个包或者开发一个包有些许问题时, 可以通过 `npm link` 的方法链接到全局的 `node_modules`下

[根据文档介绍](https://docs.npmjs.com/cli/v6/commands/npm-link): 包名是根据 `package.json`中的 `name`字段指定, 而不是通过文件夹名称

### 示例

```shell
npm link // 没有后缀参数的指的是链接到全局的包
npm link <package name> // 在项目中链接包
```

```bash
# 需要链接的包 redis
cd ./node-redis
npm link # ~ GitHub/jiandanaiyici/nz-webpack/examples/redis  ---> node/v14.10.0/lib/node_modules/redis

# 项目
cd project
npm link redis
```

接下来创建两个文件夹, 一个用于存放包(redis), 一个存放项目进行测试(project), 分别通过 `npm init -y` 初始化

创建文件 `redis/index.js`

```typescript
module.exports = 'Test';
```

创建文件 `project/index.js`

```typescript
const str = require('redis');
console.log(str); // Test
```
当我们调试结束后, 可以通过 `npm unlink` 删除链接 ,[可参考](https://stackoverflow.com/questions/19094630/how-do-i-uninstall-a-package-installed-using-npm-link)

---

### 参考

- [npm link](https://docs.npmjs.com/cli/v6/commands/npm-link)
- [你所不知道的模块调试技巧 - npm link](https://github.com/atian25/blog/issues/17)
- [Understanding npm-link](https://medium.com/dailyjs/how-to-use-npm-link-7375b6219557)
- [How to test an npm package locally](https://flaviocopes.com/npm-local-package/)
