async function async1() {
  console.log('1 start');
  await async2();
  console.log('1 end');
}

async function async2() {
  console.log('2');
}

console.log('script start');

setTimeout(() => {
  console.log('settimout');
}, 0);

async1();
new Promise((resolve) => {
  console.log('promise1');
  resolve();
}).then(function () {
  console.log('promise2');
});
console.log('script end');
/**
 * script start
 * 1 start
 * 2 promise1
 * 3. script end
 * 4. 1 end
 * 5. script end
 * 6. 1 end
 * 7. prmise2
 * 8. settimeout
 */

/**
 * 1. 执行同步代码, 输出 script start,  setTimeout 放入宏任务队列
 * 2. 执行 async1 输出 1 start 这里遇到了 await 执行, 等同于 promose.then的回调, 放入微任务队列中, 但是调用了 async2, 输出 2
 * 3. new Promise 创建时是立即执行, 输出 promise1, 遇到了 resolve 放入微任务队列中
 * 4. 执行最后一行同步任务 script end 其实也算是宏任务执行, 查询微任务队列是否为空, 不为空接着清空本轮的微任务队列
 * 5. 输出 1 end 和 promise2 清空之后, 接着执行 宏任务队列中的 settimeout
 */