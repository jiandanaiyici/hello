---
sidebarDepth: 3
---

# 基本类型

### 布尔

最基本的数据类型是简单的 `true / false` 值

```ts
let isDone: boolean = false;
```

### 数字

TS 中所有的数字都是浮点值,类型都是 number

```ts
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;
```

### 字符串

```ts
let color: string = 'blue';
color = 'red';

let fullName: string = `Bob Bobbington`;
```

除了可以使用单引号(''), 双引号("") 也可以使用模板字符串解析

```ts
let str: string = `this is ${color}`;
```

JS 中的一些引用类型 以及增加的 元组类型

### 数组

分为两种方式表达

- 一种为 `string[]`
- 一种为使用数组泛型 `Array<string>`

```ts
const arr: string[] = ['1', '2'];
const list: Array<number> = [1, 2];
```

### 元组

元组类型允许表示具有固定数量的元素的数组, 这些元素的类型是已知的, 并对应索引值, 这是一个比较高级的用法

```ts
let x: [string, number];
x = ['Hello', 10]; // OK
x = [10, 'Hello']; // Error
```

### 枚举

枚举是一种为数值集提供更友好名称的方法, 个人的理解是和接口定义有些类似, 默认情况下, 枚举开始为其成员编号 0, 可以手动设置其中一个成员的值来更改设置, 感觉这是一个很有用的东西, 待续

```ts
enum Color {
  Red,
  Green,
  Blue,
}
let c: Color = Color.Green;

// 手动修改赋值

enum Color {
  Red = 3,
  Green,
  Blue = 4,
}
let c: Color = Color.Red;
let g: Color = Color.Green; // 2 根据前一个位置进行向后移动

/** 而当 Red = 3 时, Green 依旧会是 4 */
```

### Any

在编写程序时, 有时可能某些值为动态的, 不确定变量类型, 此时可以定义为 any (任意类型的值), 或许在定义数组, 元组时, 包含的元素类型不是统一的

```ts
let notSure: any = 4;
notSure = '不确定到底是哪一种类型, 所以用 any';

let list: any[] = [1, '数组', true];
```

### void

void 有点像是相反的 any, 表示没有任何类型, 只能分配 undefined 或 null

```ts
/** 作为函数的返回值 */
function warnUser(): void {
  console.log('这是一个自定义警告信息');
}
let unusable: void = undefined;
```

### Null & Undefined

`undefined` 和 `null` 实际有自己类型的命名 `undefined` 和 `null` , 就像 `void`, 意义并不是很大, 默认情况下, `null` 和 `undefined` 是所有其他类行的子类型

在未开启 `--strictNullChecks`情况下, 是可以将 `undefined` 和 `null` 赋值给 `string` 和 `number` 等类型, 但如果开始后就不能赋值, 只能非配给自己或者 `void`

```ts
let u: undefined = undefined;
let n: null = null;
```

### never

该 never 类型表示从未发生或者永久不无法返回的类型, 如函数表达式或箭头函数表达式的返回类型总是抛出异常或永不返回的异常, 没有类型是`never` 的子类型,或可以赋值给 `never`类型(除了本身之外) 即便是 `any` 也不可赋值给 `never`

```ts
function error(message: string): never {
  throw new Error(message);
}

function fail() {
  return error('Something failed');
}

// 无止境的运行方法
function infiniteLoop(): never {
  while (true) {}
}
```

### Object

`object` 表示非原始类型, 也就是除 `number , string, boolean, symbol, null 或者 undefined` 之外的类型

### 类型断言

类型断言有两种方式, 一种是"角括号" 另一种是 as, 不会在运行时造成影响, 纯粹由编译器使用. 但在 JSX 中使用 TS, 只允许使用 as 方法

- 第一种: 只能够在 `jsx` 中使用

```ts
cosnt someValue: any = 'this is a string';
const len: number = (<string>someValue).length;

```

- 第二种: 使用 `as`

```ts
const someValue: any = 'this is a string';
const len: number = (someValue as string).length;
```
