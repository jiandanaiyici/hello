const p = function () {
  return new Promise((resolve) => {
    const p1 = new Promise((res) => {
      setTimeout(() => {
        res(1);
      }, 0);

      res(2); // 可尝试注释
    });

    p1.then((res) => {
      console.log(res);
    });

    console.log(3);
    resolve(4);
  });
};

p().then((res) => {
  console.log(res);
});

console.log('end');

/**
 * 1. p 只是创建了函数, 并未执行, 接着往下看遇到了 p 执行,
 * 返回了 Promise 实例对象, 遇到 resolve 或 reject 之前的代码执行, 输出 3, 接着执行同步代码 end 第一轮宏任务执行结束
 * 2. 在上一轮的宏任务执行中, 将 p 和 p1 放入了 微任务队列中, 此时检查微任务队列, 取第一个 p1 执行 输出 2, 最后输出 4
 */

/** 如果将 res(2) 注释的话 执行结果就不一样了 */
/**
 * 1. 第一步同上, 输出 3 和 end, 此时可以看到 setTimeout 放入了宏任务队列中, 检查微任务进行执行 p
 * 2. 4 清空微任务队列, 进入下一次的宏任务循环执行
 * 3. 最后输出 1
 */
