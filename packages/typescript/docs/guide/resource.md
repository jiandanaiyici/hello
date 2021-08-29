---
sidebarDepth: 3
---


### 文档

- [**官网**](https://www.typescriptlang.org/)** / **[**声明模板**](https://www.typescriptlang.org/docs/handbook/declaration-files/by-example.html)
- [**TypeScript Github 内置类型定义 lib/lib.es5.d.ts**](https://github.com/microsoft/TypeScript/blob/main/lib/lib.es5.d.ts)
- [**Definitelytyped**](http://definitelytyped.org/)**: 整理关于一些第三方包的 typescript 支持**
- [**TypeScript Deep Dive **](https://basarat.gitbook.io/typescript/)**---->**[**深入理解TypeScript**](https://jkchao.github.io/typescript-book-chinese/)
- [**TS入门教程**](https://ts.xcatliu.com/)
- [**TS 中文手册**](https://typescript.bootcss.com/)
- [**可选操作链符**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/%E5%8F%AF%E9%80%89%E9%93%BE)
- [**Typescript 中文版**](https://zhongsp.gitbooks.io/typescript-handbook/content/)
- [**The unknown Type in TypeScript**](https://mariusschulz.com/blog/the-unknown-type-in-typescript)
- [**Typescript Quickly**](https://livebook.manning.com/book/typescript-quickly/about-this-book/)
- [**JSDOC Reference**](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html#extends)**: 关于 jsdoc 注释的使用****​**
- [**utility-types**](https://github.com/piotrwitek/utility-types)**: flowjs**
<!-- ### [![image.png](https://cdn.nlark.com/yuque/0/2020/png/106721/1606046939153-d3c48ce1-9499-4cb0-853c-8e0ce4493d72.png#height=810&id=jbINR&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1619&originWidth=1643&originalType=binary&ratio=1&size=367037&status=done&style=none&width=821.5)](https://juejin.cn/post/6872111128135073806) -->


### 博客

- [**Typescript 类型别名**](https://juejin.cn/post/6844903753431138311)
- [**the return type of function**](https://stackoverflow.com/questions/36015691/obtaining-the-return-type-of-a-function)
- [**TypeScript: Built in generic types**](https://fettblog.eu/typescript-built-in-generics/)
- [**TypeScript 条件类型的 infer 类型推断能力**](https://juejin.cn/post/6844904067420913678)
- [**TypeScript 高级类型-条件类型**](https://blog.csdn.net/roamingcode/article/details/104114372)
- [**TypeScript 夜点心: 条件泛型**](https://blog.csdn.net/roamingcode/article/details/104114372)
- [**如何编写 TypeScript 声明文件**](https://juejin.cn/post/6844903693226082318)
- [**巧用TypeScript**](https://juejin.cn/post/6844903687563771918#heading-0)
- [**TypeScript 的 extends 条件类型**](https://juejin.cn/post/6844904066485583885)
- [**速查手册 TypeScript 高级类型**](https://segmentfault.com/a/1190000018726280)
- [**一份不可多得的TS的学习指南**](https://juejin.cn/post/6872111128135073806)
- [**TypeScript 高手篇: 22个示例深入讲解TS最晦涩难懂的高级工具**](https://juejin.cn/post/6994102811218673700)

---


### 介绍
被称之为加强版JS, JS为动态语言 只在运行执行时才能明确知道变量 / 参数的类型, 而 TS 在编写编译前就已经将类型固定, 等到有错误时提早发现以便不会在运行时出错


### 安装
**使用 npm 全局安装 typescript 解析**
```bash
npm install -g typescript
```
**安装后需要对**`**TS**`**文件进行编译解析时需要配置 **`**tsconfig.json**`** 文件 可以通过 **`**tsc --init**`** 初始化配置**
```bash
# 在目录文件下初始化 tsconfig.json 配置文件
tsc --init
npx tsc --init

# 查看其它帮助
tsc --help || tsc -h

# 监听文件修改实时编译, 在监视模式下运行编译器。会监视输出文件，在它们改变时重新编译
tsc --watch || tsc -w
```
**参考 :**[**How can I generate a tsconfig.json file?**](https://stackoverflow.com/questions/36916989/how-can-i-generate-a-tsconfig-json-file)
**构建第一个TS 文件以及添加 类型注释**
```typescript
function greeter(person) {
	return 'Hello' + person;
}

let user = 'Jane User';
document.body.textContent = greeter(user);

// 对参数添加类型注释
function greeter(person: string) {
	return 'Hello' + person;
}
```


**编译运行代码**
虽然以上第一段代码中显示为 JS, 仍旧可以使用 TS 编译器编译为何原本JS代码一样的代码, 第二段代码就已经添加了参数类型注释, 当在调用时, 传递的参数不是 string 类型时, 即报错
```bash
tsc greeter.ts
```


**定义接口**: 目前没有找到更合理更合适的解释, 理解为当单个参数使用参数注释定义时是可以的, 但假设涉及了比较复杂的参数或单个对象内无法自定义指定时 或者 多个参数时, 使用注释方法就不靠谱了, 这才有了接口就是按照指定的格式及类型定义的"模板"
```typescript
interface Person {
	firstName: string;
  lastName: string;
}
 
// 此处定义了 Person 接口, 指定了 必须要包含有 firstName(string 类型) 以及 lastName(string 类型)
function greeter(person: Person) {
	return 'Hello' + person.firstName + ' '  + person.lastName;
}

let user = { firstName: 'Jane', lastName: 'User' };

document.body.textContent = greeter(user);
```


### 手册
#### 


##### 声明
在没有提供函数实现的情况下, 有两种声明函数类型的方式
```typescript
// 返回类型注解
interface Foo {
	foo: string;
}

function foo(sample: Foo): Foo {
	return sample
}

function foo(sample: Foo) {
	return sample; // 可以不手动添加注解, 编译器推断
}

// 可选参数, 通常情况下个人喜欢超过三个及以上参数时使用对象来接收, 不需要考虑到顺序问题
interface Foo {
	width: number;
  height?: number;
}

function foo(width: number, height?: number) {
	return width + height;
}
```




### 声明
#### 全局声明文件
无论是你使用TS来书写你的项目或者发布NPM包时, 通常都会在某一个地方声明类型接口等之类的文件, 当一个项目足够大或者复杂时会出现比较多的重复的声明, 你可以在全局管理一些比较通用的模块声明, 通过使用 declare 关键词, 告诉 Typescript 来表述一个其他地方已经存在了声明, 在实际项目里, 可以使用 globals.d.ts 或者 vendor.d.ts 文件, 如果一个文件扩展名是 .d.ts 这意味着每个顶级的声明都必须以 declare 关键字作为前缀, 例如 [**node.d.ts**](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/node/index.d.ts)
例如: 
```typescript
declare var foo: any // 声明一个全局的 foo 类型的定义
declare type $FIXME = any; 
```
### 类型系统
#### 第三方代码
**例如将JS项目改成TS项目, 某些第三方文件或者模块是没有指定类型的, 此时你需要使用声明文件将其导入可以检测类型, **[**更多的参考(DefinitelyTyped)**](https://github.com/DefinitelyTyped/DefinitelyTyped)
**​**

#### 非JS资源
**可以参考 ant-design 中的**[**自定义声明文件**](https://github.com/ant-design/ant-design/blob/master/typings/custom-typings.d.ts)
```typescript
declare module '*.css';

declare module '*.html';
```
#### 使用 
通过配置 tsconfig.json 中的 compilerOptions.types引入有意义的类型
```json
{
	"compilerOptions": {
  	"types": [
    	"jquery",
    ],
  },
}
```
### FAQ

- [How to define type for a function callback (as any function type, not universal any) used in a method parameter](https://stackoverflow.com/questions/29689966/how-to-define-type-for-a-function-callback-as-any-function-type-not-universal)
