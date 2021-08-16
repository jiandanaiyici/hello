# 常见问题


- node-gyp rebuild error

> 1. 需要设置指定依赖 python 的版本及路径, 只支持 2.x 版本, 不支持 3.x

```bash
# 设置 gyp 调用python 路径, 不支持 python 3.x 版本
# https://github.com/nodejs/node-gyp#installation
# http://sharp.pixelplumbing.com/en/stable/install/
# http://blog.51yip.com/jsjquery/1962.html npm install -g bcrypt  

npm config set python $(which python)
```

- sharp install use cache

> 安装 `sharp` 时首先使用了 `npm`缓存中的版本
```bash
cd .npm

rm -rf sharp

# 进入项目
cd your project
rm -rf node_modules
npm install --force
```

- childImageSharp/gatsby-transformer-sharp
> 更新包, 如若不行, 删除缓存中的依赖, 删除 node_modules, 重新安装并强制不使用缓存
```bash
# node-gyp(需要 node < 11>) sharp

# 更新包
npm update
```

- Error: spawn ../node_modules/optipng-bin/vendor/optipng ENOENT
```bash
# 删除 .npm 
rm -rf _libvips

npm install libpng-dev
```