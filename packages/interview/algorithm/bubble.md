---
id: bubble
title: 冒泡排序
---

冒泡排序也称为泡式排序, 通过重复的两两之间的对比, 每次对比过后将两个值进行对换,小值在左 大值在右每一轮执行完之后都会保证本次循环中的右侧都是当前循环中的最大值

```typescript
// 正向交换 小 ---> 大
Array.prototype.bubble_sort = function () {
  let temp;
  // 外层循环只是保证循环比较, 两两之间比较, 最后一个数字是和前一个值共用 length - 1 次的循环
  for (let i = 0; i < this.length - 1; i++) {
    /** 外层循环每次循环结束后都会将本轮循环中的最大值交换到最右侧, 下次循环时就不再需要进行判断 */
    for (let j = 0; j < this.length - 1 - i; j++) {
      if (this[j] > this[j + 1]) {
        temp = this[j];
        this[j] = this[j + 1];
        this[j + 1] = temp;
      }
    }
  }

  return this;
};

// 反向交换是不是也可以 ? 大 --> 小
Array.prototype.bubble_sort = function () {
  let temp;
  for (let i = this.length - 1; i > 0; i--) {
    for (let j = i; j >= 0; j--) {
      if (this[i] < this[i - 1]) {
        temp = this[i];
        this[i] = this[i - 1];
        this[i - 1] = temp;
      }
    }
  }

  return this;
};
```

---

以上代码实现了基本的冒泡排序方式, 但如果整个数组中本来就是按照正序方式排序的岂不是也是要一遍遍的进行这循环 ?, 初步优化 如果第一遍或第 N 遍循环就已经将所有顺序排序好就不在循环

```typescript
Array.prototype.bubble = function () {
  let temp;
  let flag = true;
  for (let i = 0, len = this.length; i < len - 1; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      if (!flag) {
        break;
      }

      flag = true;

      if (this[i] < this[i + 1]) {
        temp = this[i];
        this[i] = this[i + 1];
        this[i + 1] = temp;
      }
    }
  }
  return this;
};
```

### 参考

- [冒泡排序 维基百科](https://zh.wikipedia.org/wiki/%E5%86%92%E6%B3%A1%E6%8E%92%E5%BA%8F#JavaScript)
