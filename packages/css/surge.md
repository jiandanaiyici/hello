# Surge

[官网](https://surge.sh/)

> 静态部署

```bash
# 全局安装
npm install --global surge

surge

# 输入邮箱 和 密码

# 将域名配置存在根目录下
echo vancouver.surge.sh > CNAME

surge ./
```

## 添加 404.html

> 默认使用 `Surge`提供的 404 页面
