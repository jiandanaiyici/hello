# 接口

对象`object`是一种类型, 表示非原始型的, 即任何不适 `number` `string` `boolean` `symbol` `null` 或 `undefined`

接口的作用是为这行类型命名和为你的代码或第三方代码定义契约, 简单的说就是在编写函数或定义对象时指定了接口 `interface`之后, 函数接收的参数对象或直接定义的对象必须是在 接口`interface` 中的类型中

```ts
interface PrintLabelParam {
  name: string;
  age?: number;
}

function printLabel(obj: PrintLabelParam) {
  console.log(obj.name, obj.number);
}

/** 那么在调用函数时, 可接受的参数必须是对象, 且属性key必须是 name 或者 age, 对应的 value 必须 name 为 string, 而 age 是number 或者 undefined */
```

### 可选属性

从以上代码中看到当定义 `age` 时, 添加了 `?`修饰符, 表示此属性可有可无, 但如果有就必须是对应的 `number` 好处就是在传递参数时缺失了某个参数时不会报错

### 只读属性

通过对属性添加修饰符 `readonly`来表示此属性不允许修改, 只允许获取, 这同于 `Readonly`高级工具, 在 3.4版本之后添加了 `ReadonlyArray<T>`, 表示数据或元组不允许修改

```ts
interface Point {
  readonly x: number;
  readonly y: number;
}

// 只可获取不可修改, 且都为必选
let p: Point = {
  x: 1,
  y: 1,
}

/** 通过 Readonly<T>泛型对定义过的接口添加 readonly 修饰符 */
interface Point {
  x: number;
  y: number;
}

type A = Readonly<Point>;
// 等同于上边的 Point

/** ReadonlyArray<T> */
let list: number[] = [1, 2, 3]; // 可以使用对数组修改的一些方法, 比如 push pop 等

let arr: ReadonlyArray<number> = [1, 2, 3];
// 此时再使用 arr.push 就会报错, 因为已经定义好了数组只允许查看不允许修改
```

### const

`const` 定义的是一个不可能修改的变量, 需要注意的是只是基础类型, 而对于引用类型`Array` 和 `Object` 时依旧还是可以修改其属性, 这里需要和 `readonly`区分开的是, `readonly`大多用于描述属性是否可修改, 而 `const` 仅仅是针对变量, 除此之外还可以使用类型断言的方式对没有个属性都添加 `readonly`属性

```ts
const arr = [1, 2, 3]; // 可以使用 arr.push 方法
const arr: Readonly<number> = [1, 2, 3]; // 不允许使用 arr.push 进行修改

/** 当使用类型断言之后: 除了约定了类型, 数量 最重要的更是约定了每个元素的值 */
const arr = [1, 2, 3] as const;

```

### 额外检查

当定义接口`interface` 时, 某些属性未知的, 或许是动态的 无法知道具体的类型时, 可以通过类型检查方式防止报错

```ts
interface SquareConfig {
  widht: number;
  height: number;
  /** 其他未知属性名及值类型: 这里 key 必须是 string number 或 symbol */
  [k: string]: any;
}

```

### 函数类型

接口 `interface` 除了可以表示普通的对象外, 还可以描述函数类型, 比如

```ts
interface SearchFunc {
  (source: string): boolean;
}

// 或者是
type SearchFunc = (source: string) => boolea;

function fn()
```
